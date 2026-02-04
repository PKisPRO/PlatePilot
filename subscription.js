// PlatePilot Subscription Delivery Logic
// Handles pricing, cost calculation, localStorage persistence, and subscription management UI.

(function () {
    const STORAGE_KEY = 'platepilot_subscriptions';

    // Configurable price map for fruits & vegetables
    // Update this single object to change pricing or available items.
    const PRICE_MAP = {
        tomato: { id: 'tomato', name: 'Tomato', unit: 'kg', price: 40 },
        potato: { id: 'potato', name: 'Potato', unit: 'kg', price: 30 },
        onion: { id: 'onion', name: 'Onion', unit: 'kg', price: 35 },
        apple: { id: 'apple', name: 'Apple', unit: 'kg', price: 120 },
        banana: { id: 'banana', name: 'Banana', unit: 'dozen', price: 60 },
        carrot: { id: 'carrot', name: 'Carrot', unit: 'kg', price: 50 },
        spinach: { id: 'spinach', name: 'Spinach', unit: 'bunch', price: 25 },
        cucumber: { id: 'cucumber', name: 'Cucumber', unit: 'kg', price: 45 }
    };

    // Delivery fee configuration (per week)
    const DELIVERY_FEE_PER_WEEK = 50; // ₹

    const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    // Utility: read and write subscriptions in localStorage
    function loadSubscriptions() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return [];
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
            console.error('Failed to parse subscriptions from storage', e);
            return [];
        }
    }

    function saveSubscriptions(list) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
        } catch (e) {
            console.error('Failed to save subscriptions', e);
        }
    }

    function generateSubscriptionId() {
        const random = Math.floor(10000 + Math.random() * 90000);
        return `PP-SUB-${random}`;
    }

    // Compute next delivery date based on start date and selected days
    function computeNextDeliveryDate(startDateStr, selectedDays) {
        if (!startDateStr || !selectedDays || selectedDays.length === 0) {
            return null;
        }

        const start = new Date(startDateStr + 'T00:00:00');
        if (isNaN(start.getTime())) return null;

        // Map Mon-Sun to 1-0 (JS 0=Sun)
        const dayToIndex = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
        const selectedIdx = selectedDays.map(d => dayToIndex[d]).filter(v => typeof v === 'number');
        if (selectedIdx.length === 0) return null;

        const startIdx = start.getDay();
        for (let offset = 0; offset <= 13; offset++) {
            const candidate = new Date(start);
            candidate.setDate(start.getDate() + offset);
            const idx = candidate.getDay();
            if (selectedIdx.includes(idx)) {
                return candidate;
            }
        }
        return null;
    }

    function formatDateForDisplay(date) {
        if (!(date instanceof Date) || isNaN(date.getTime())) return 'Unknown';
        return date.toLocaleDateString('en-IN', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    // DOM helpers
    function qs(id) {
        return document.getElementById(id);
    }

    function getCheckedValues(container) {
        return Array.from(container.querySelectorAll('input[type="checkbox"]:checked')).map(
            (el) => el.value
        );
    }

    function getSelectedRadioValue(name) {
        const el = document.querySelector(`input[name="${name}"]:checked`);
        return el ? el.value : null;
    }

    // Build dynamic UI sections
    function initItemsUI() {
        const container = qs('itemsContainer');
        if (!container) return;

        container.innerHTML = '';
        Object.values(PRICE_MAP).forEach((item) => {
            const row = document.createElement('div');
            row.className =
                'subscription-item-row flex items-center justify-between space-x-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-3 py-2';
            row.innerHTML = `
                <label class="flex-1 flex items-center space-x-2 text-sm">
                    <input type="checkbox" class="text-green-600 focus:ring-green-500" data-item-id="${item.id}">
                    <div>
                        <p class="font-medium text-gray-800 dark:text-gray-100">${item.name}</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">₹${item.price}/${item.unit}</p>
                    </div>
                </label>
                <div class="flex items-center space-x-1">
                    <input
                        type="number"
                        min="0"
                        step="0.5"
                        value="0"
                        class="w-20 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-1 text-xs text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-green-500"
                        data-item-qty="${item.id}"
                    >
                    <span class="text-xs text-gray-500 dark:text-gray-400">${item.unit}</span>
                </div>
            `;
            container.appendChild(row);
        });
    }

    function initDaysUI() {
        const container = qs('daysContainer');
        if (!container) return;
        container.innerHTML = '';
        DAY_LABELS.forEach((day) => {
            const wrapper = document.createElement('label');
            wrapper.className =
                'flex items-center space-x-2 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-2 py-1';
            wrapper.innerHTML = `
                <input type="checkbox" value="${day}" class="text-green-600 focus:ring-green-500">
                <span class="text-xs text-gray-700 dark:text-gray-300">${day}</span>
            `;
            container.appendChild(wrapper);
        });
    }

    // Calculate costs and update summary panel
    function calculateSummary() {
        const itemsContainer = qs('itemsContainer');
        const daysContainer = qs('daysContainer');
        const summaryItems = qs('summaryItems');
        const summaryDays = qs('summaryDays');
        const summaryPlanType = qs('summaryPlanType');
        const summaryTimeSlot = qs('summaryTimeSlot');
        const summaryPerDelivery = qs('summaryPerDelivery');
        const summaryDeliveriesPerWeek = qs('summaryDeliveriesPerWeek');
        const summaryWeeklyCost = qs('summaryWeeklyCost');
        const summaryDeliveryFee = qs('summaryDeliveryFee');
        const summaryTotalWeekly = qs('summaryTotalWeekly');

        if (
            !itemsContainer ||
            !daysContainer ||
            !summaryItems ||
            !summaryDays ||
            !summaryPlanType
        ) {
            return;
        }

        // Items
        const selectedItems = [];
        let perDeliveryCost = 0;

        Object.values(PRICE_MAP).forEach((item) => {
            const checkbox = itemsContainer.querySelector(`input[data-item-id="${item.id}"]`);
            const qtyInput = itemsContainer.querySelector(`input[data-item-qty="${item.id}"]`);
            const qty = qtyInput ? parseFloat(qtyInput.value || '0') : 0;

            if (checkbox && checkbox.checked && qty > 0) {
                const lineTotal = item.price * qty;
                perDeliveryCost += lineTotal;
                selectedItems.push({
                    id: item.id,
                    name: item.name,
                    unit: item.unit,
                    price: item.price,
                    quantity: qty,
                    lineTotal
                });
            }
        });

        // Render items summary
        summaryItems.innerHTML = '';
        if (selectedItems.length === 0) {
            summaryItems.innerHTML =
                '<li class="text-gray-400 dark:text-gray-500">No items selected yet.</li>';
        } else {
            selectedItems.forEach((it) => {
                const li = document.createElement('li');
                li.textContent = `${it.name} - ${it.quantity} ${it.unit} × ₹${it.price} = ₹${it.lineTotal.toFixed(
                    0
                )}`;
                summaryItems.appendChild(li);
            });
        }

        // Days
        const selectedDays = getCheckedValues(daysContainer);
        summaryDays.textContent =
            selectedDays.length > 0 ? selectedDays.join(', ') : 'No days selected.';

        // Plan and time slot
        const planType = getSelectedRadioValue('planType');
        const timeSlot = getSelectedRadioValue('timeSlot');

        summaryPlanType.textContent = `Plan: ${
            planType === 'weekly'
                ? 'Weekly'
                : planType === 'alternate'
                ? 'Alternate days'
                : planType === 'custom'
                ? 'Custom days'
                : 'Not selected.'
        }`;

        summaryTimeSlot.textContent = `Time slot: ${
            timeSlot === 'morning'
                ? 'Morning'
                : timeSlot === 'evening'
                ? 'Evening'
                : 'Not selected.'
        }`;

        // Frequency factor based on plan
        let deliveriesPerWeek = 0;
        if (planType === 'weekly') {
            deliveriesPerWeek = 1;
        } else if (planType === 'alternate') {
            deliveriesPerWeek = 2.5;
        } else if (planType === 'custom') {
            deliveriesPerWeek = selectedDays.length;
        }

        const estimatedWeeklyCost = perDeliveryCost * deliveriesPerWeek;
        const deliveryFee = deliveriesPerWeek > 0 ? DELIVERY_FEE_PER_WEEK : 0;
        const totalWeekly = estimatedWeeklyCost + deliveryFee;

        summaryPerDelivery.textContent = `₹${perDeliveryCost.toFixed(0)}`;
        summaryDeliveriesPerWeek.textContent = deliveriesPerWeek.toString();
        summaryWeeklyCost.textContent = `₹${estimatedWeeklyCost.toFixed(0)}`;
        summaryDeliveryFee.textContent = `₹${deliveryFee.toFixed(0)}`;
        summaryTotalWeekly.textContent = `₹${totalWeekly.toFixed(0)}`;

        return {
            selectedItems,
            selectedDays,
            planType,
            timeSlot,
            perDeliveryCost,
            deliveriesPerWeek,
            estimatedWeeklyCost,
            deliveryFee,
            totalWeekly
        };
    }

    function showErrors(errors) {
        const box = qs('formErrors');
        if (!box) return;
        if (!errors || errors.length === 0) {
            box.classList.add('hidden');
            box.innerHTML = '';
            return;
        }
        box.classList.remove('hidden');
        box.innerHTML =
            '<ul class="list-disc list-inside space-y-1">' +
            errors.map((e) => `<li>${e}</li>`).join('') +
            '</ul>';
    }

    function validateForm(summary) {
        const errors = [];

        if (!summary || summary.selectedItems.length === 0) {
            errors.push('Please select at least one item with quantity greater than 0.');
        }

        if (!summary || summary.selectedDays.length === 0) {
            errors.push('Please select at least one delivery day.');
        }

        if (!summary.planType) {
            errors.push('Please choose a plan type.');
        }

        if (!summary.timeSlot) {
            errors.push('Please select a delivery time slot.');
        }

        const startDate = qs('startDate')?.value;
        if (!startDate) {
            errors.push('Please select a start date.');
        }

        const address = qs('address')?.value.trim();
        if (!address) {
            errors.push('Please enter delivery address.');
        }

        const phone = qs('phone')?.value.trim();
        if (!phone) {
            errors.push('Please enter phone number.');
        } else if (phone.replace(/\D/g, '').length < 8) {
            errors.push('Please enter a valid phone number.');
        }

        showErrors(errors);
        return errors.length === 0;
    }

    function buildSubscriptionObject(summary, editingId) {
        const startDate = qs('startDate')?.value;
        const address = qs('address')?.value.trim();
        const phone = qs('phone')?.value.trim();

        const nextDeliveryDate = computeNextDeliveryDate(startDate, summary.selectedDays);

        return {
            id: editingId || generateSubscriptionId(),
            createdAt: new Date().toISOString(),
            status: 'active',
            items: summary.selectedItems,
            daysOfWeek: summary.selectedDays,
            planType: summary.planType,
            timeSlot: summary.timeSlot,
            startDate,
            address,
            phone,
            perDeliveryCost: summary.perDeliveryCost,
            deliveriesPerWeek: summary.deliveriesPerWeek,
            estimatedWeeklyCost: summary.estimatedWeeklyCost,
            deliveryFeePerWeek: summary.deliveryFee,
            totalWeeklyCost: summary.totalWeekly,
            nextDeliveryDate: nextDeliveryDate ? nextDeliveryDate.toISOString() : null
        };
    }

    function populateFormFromSubscription(sub) {
        const itemsContainer = qs('itemsContainer');
        const daysContainer = qs('daysContainer');
        if (!sub || !itemsContainer || !daysContainer) return;

        // Items
        Object.values(PRICE_MAP).forEach((item) => {
            const checkbox = itemsContainer.querySelector(`input[data-item-id="${item.id}"]`);
            const qtyInput = itemsContainer.querySelector(`input[data-item-qty="${item.id}"]`);
            const found = sub.items.find((it) => it.id === item.id);
            if (checkbox) checkbox.checked = !!found;
            if (qtyInput) qtyInput.value = found ? found.quantity : '0';
        });

        // Days
        Array.from(daysContainer.querySelectorAll('input[type="checkbox"]')).forEach((cb) => {
            cb.checked = sub.daysOfWeek.includes(cb.value);
        });

        // Plan, slot, dates, address, phone
        const planRadio = document.querySelector(
            `input[name="planType"][value="${sub.planType}"]`
        );
        if (planRadio) planRadio.checked = true;

        const slotRadio = document.querySelector(
            `input[name="timeSlot"][value="${sub.timeSlot}"]`
        );
        if (slotRadio) slotRadio.checked = true;

        if (qs('startDate')) qs('startDate').value = sub.startDate || '';
        if (qs('address')) qs('address').value = sub.address || '';
        if (qs('phone')) qs('phone').value = sub.phone || '';
    }

    function resetForm() {
        const itemsContainer = qs('itemsContainer');
        const daysContainer = qs('daysContainer');

        if (itemsContainer) {
            Array.from(itemsContainer.querySelectorAll('input[type="checkbox"]')).forEach(
                (cb) => (cb.checked = false)
            );
            Array.from(itemsContainer.querySelectorAll('input[type="number"]')).forEach(
                (input) => (input.value = '0')
            );
        }

        if (daysContainer) {
            Array.from(daysContainer.querySelectorAll('input[type="checkbox"]')).forEach(
                (cb) => (cb.checked = false)
            );
        }

        Array.from(document.querySelectorAll('input[name="planType"]')).forEach(
            (r) => (r.checked = false)
        );
        Array.from(document.querySelectorAll('input[name="timeSlot"]')).forEach(
            (r) => (r.checked = false)
        );

        if (qs('startDate')) qs('startDate').value = '';
        if (qs('address')) qs('address').value = '';
        if (qs('phone')) qs('phone').value = '';
        showErrors([]);
        calculateSummary();
    }

    // Manage subscriptions list UI
    function renderSubscriptionsList() {
        const container = qs('subscriptionsList');
        if (!container) return;
        const list = loadSubscriptions();

        container.innerHTML = '';
        if (list.length === 0) {
            container.innerHTML =
                '<p class="text-xs text-gray-500 dark:text-gray-400">You don’t have any subscriptions yet. Create one using the form on the left.</p>';
            return;
        }

        list
            .slice()
            .reverse()
            .forEach((sub) => {
                const wrapper = document.createElement('div');
                wrapper.className =
                    'rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-3 py-2';

                const badgeClass =
                    sub.status === 'active'
                        ? 'subscription-badge subscription-badge-active'
                        : sub.status === 'paused'
                        ? 'subscription-badge subscription-badge-paused'
                        : 'subscription-badge subscription-badge-cancelled';

                const nextDate =
                    sub.nextDeliveryDate && sub.status !== 'cancelled'
                        ? formatDateForDisplay(new Date(sub.nextDeliveryDate))
                        : '—';

                wrapper.innerHTML = `
                    <div class="flex items-start justify-between">
                        <div class="text-xs">
                            <p class="font-mono text-gray-800 dark:text-gray-100 mb-0.5">${sub.id}</p>
                            <p class="text-gray-600 dark:text-gray-300">
                                ${sub.items
                                    .map((it) => it.name)
                                    .join(', ')
                                    .slice(0, 60)}${sub.items.length > 0 ? '' : ''}
                            </p>
                            <p class="mt-1 text-gray-500 dark:text-gray-400">
                                Next: <span>${nextDate}</span>
                            </p>
                            <p class="mt-0.5 text-gray-500 dark:text-gray-400">
                                Weekly: <span class="font-semibold text-gray-800 dark:text-gray-100">₹${(sub.totalWeeklyCost || 0).toFixed(
                                    0
                                )}</span>
                            </p>
                        </div>
                        <div class="text-right space-y-1">
                            <span class="${badgeClass} inline-block capitalize">${sub.status}</span>
                            <div class="flex flex-wrap justify-end gap-1 mt-1">
                                <button
                                    class="view-sub-btn rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 px-2 py-0.5 text-[11px] text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    data-id="${sub.id}"
                                >
                                    View
                                </button>
                                <button
                                    class="edit-sub-btn rounded-md bg-blue-600 px-2 py-0.5 text-[11px] text-white hover:bg-blue-700"
                                    data-id="${sub.id}"
                                    ${sub.status === 'cancelled' ? 'disabled class="opacity-60 cursor-not-allowed"' : ''}
                                >
                                    Edit
                                </button>
                                <button
                                    class="pause-sub-btn rounded-md bg-yellow-500 px-2 py-0.5 text-[11px] text-white hover:bg-yellow-600"
                                    data-id="${sub.id}"
                                    ${sub.status === 'cancelled' ? 'disabled class="opacity-60 cursor-not-allowed"' : ''}
                                >
                                    ${sub.status === 'paused' ? 'Resume' : 'Pause'}
                                </button>
                                <button
                                    class="cancel-sub-btn rounded-md bg-red-600 px-2 py-0.5 text-[11px] text-white hover:bg-red-700"
                                    data-id="${sub.id}"
                                    ${sub.status === 'cancelled' ? 'disabled class="opacity-60 cursor-not-allowed"' : ''}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                `;

                container.appendChild(wrapper);
            });

        // Attach event listeners using event delegation
        container.onclick = function (e) {
            const target = e.target;
            if (!(target instanceof HTMLElement)) return;

            const id = target.getAttribute('data-id');
            if (!id) return;

            if (target.classList.contains('view-sub-btn')) {
                viewSubscriptionDetails(id);
            } else if (target.classList.contains('edit-sub-btn')) {
                editSubscription(id);
            } else if (target.classList.contains('pause-sub-btn')) {
                togglePauseSubscription(id);
            } else if (target.classList.contains('cancel-sub-btn')) {
                cancelSubscription(id);
            }
        };
    }

    function viewSubscriptionDetails(id) {
        const list = loadSubscriptions();
        const sub = list.find((s) => s.id === id);
        if (!sub) return;

        const lines = [];
        lines.push(`Subscription: ${sub.id}`);
        lines.push(`Status: ${sub.status}`);
        lines.push(
            `Items: ${sub.items
                .map((it) => `${it.name} (${it.quantity} ${it.unit})`)
                .join(', ')}`
        );
        lines.push(`Days: ${sub.daysOfWeek.join(', ')}`);
        lines.push(
            `Plan: ${
                sub.planType === 'weekly'
                    ? 'Weekly'
                    : sub.planType === 'alternate'
                    ? 'Alternate days'
                    : 'Custom days'
            }`
        );
        lines.push(`Time slot: ${sub.timeSlot}`);
        lines.push(
            `Weekly total: ₹${(sub.totalWeeklyCost || 0).toFixed(
                0
            )} (includes delivery fee)`
        );
        if (sub.nextDeliveryDate) {
            lines.push(
                `Next delivery: ${formatDateForDisplay(new Date(sub.nextDeliveryDate))}`
            );
        }
        lines.push(`Address: ${sub.address}`);
        lines.push(`Phone: ${sub.phone}`);

        alert(lines.join('\n'));
    }

    function editSubscription(id) {
        const list = loadSubscriptions();
        const sub = list.find((s) => s.id === id);
        if (!sub) return;

        // Store current editing ID on the confirm button dataset
        const confirmBtn = qs('confirmSubscriptionBtn');
        if (confirmBtn) confirmBtn.dataset.editingId = id;

        // Show form section if hidden
        const layout = qs('subscription-layout');
        const successScreen = qs('successScreen');
        if (layout && successScreen) {
            layout.classList.remove('hidden');
            successScreen.classList.add('hidden');
        }

        populateFormFromSubscription(sub);
        calculateSummary();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function togglePauseSubscription(id) {
        const list = loadSubscriptions();
        const idx = list.findIndex((s) => s.id === id);
        if (idx === -1) return;

        const sub = list[idx];
        if (sub.status === 'cancelled') return;

        sub.status = sub.status === 'paused' ? 'active' : 'paused';
        list[idx] = sub;
        saveSubscriptions(list);
        renderSubscriptionsList();
    }

    function cancelSubscription(id) {
        const list = loadSubscriptions();
        const idx = list.findIndex((s) => s.id === id);
        if (idx === -1) return;

        const sub = list[idx];
        if (sub.status === 'cancelled') return;

        if (!confirm('Are you sure you want to cancel this subscription?')) {
            return;
        }

        sub.status = 'cancelled';
        list[idx] = sub;
        saveSubscriptions(list);
        renderSubscriptionsList();
    }

    function showSuccessScreen(subscription) {
        const layout = qs('subscription-layout');
        const successScreen = qs('successScreen');
        if (!layout || !successScreen) return;

        layout.classList.add('hidden');
        successScreen.classList.remove('hidden');

        const idEl = qs('successSubscriptionId');
        const nextEl = qs('successNextDelivery');
        const weeklyEl = qs('successWeeklyTotal');

        if (idEl) idEl.textContent = subscription.id;
        if (nextEl) {
            nextEl.textContent = subscription.nextDeliveryDate
                ? formatDateForDisplay(new Date(subscription.nextDeliveryDate))
                : 'Scheduled as per plan';
        }
        if (weeklyEl) {
            weeklyEl.textContent = `₹${(subscription.totalWeeklyCost || 0).toFixed(0)} / week`;
        }

        // Attach success actions
        const downloadBtn = qs('downloadPlanBtn');
        const newBtn = qs('newSubscriptionBtn');
        const viewAllBtn = qs('viewAllSubscriptionsBtn');

        if (downloadBtn) {
            downloadBtn.onclick = function () {
                downloadPlan(subscription);
            };
        }
        if (newBtn) {
            newBtn.onclick = function () {
                const confirmBtn = qs('confirmSubscriptionBtn');
                if (confirmBtn) delete confirmBtn.dataset.editingId;
                resetForm();
                layout.classList.remove('hidden');
                successScreen.classList.add('hidden');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            };
        }
        if (viewAllBtn) {
            viewAllBtn.onclick = function () {
                layout.classList.remove('hidden');
                successScreen.classList.add('hidden');
                renderSubscriptionsList();
                const listEl = qs('subscriptionsList');
                if (listEl) {
                    listEl.scrollIntoView({ behavior: 'smooth' });
                }
            };
        }
    }

    function downloadPlan(subscription) {
        const win = window.open('', '_blank');
        if (!win) {
            alert('Please allow pop-ups to download your plan.');
            return;
        }

        const nextDate = subscription.nextDeliveryDate
            ? formatDateForDisplay(new Date(subscription.nextDeliveryDate))
            : 'As per schedule';

        const itemsRows = subscription.items
            .map(
                (it) => `
            <tr>
                <td>${it.name}</td>
                <td>${it.quantity} ${it.unit}</td>
                <td>₹${it.price}</td>
                <td>₹${(it.lineTotal || 0).toFixed(0)}</td>
            </tr>
        `
            )
            .join('');

        win.document.write(`
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Subscription Plan - ${subscription.id}</title>
    <style>
        body { font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; margin: 24px; color: #111827; }
        h1 { font-size: 1.5rem; margin-bottom: 0.5rem; }
        h2 { font-size: 1.1rem; margin-top: 1.5rem; margin-bottom: 0.5rem; }
        .muted { color: #6B7280; font-size: 0.85rem; }
        .section { margin-bottom: 1rem; }
        table { width: 100%; border-collapse: collapse; margin-top: 0.5rem; font-size: 0.9rem; }
        th, td { border: 1px solid #E5E7EB; padding: 6px 8px; text-align: left; }
        th { background-color: #F3F4F6; }
        .totals { margin-top: 0.75rem; font-size: 0.9rem; }
        .totals p { margin: 0.2rem 0; }
        .totals strong { font-weight: 600; }
        .badge { display: inline-block; border-radius: 9999px; padding: 2px 8px; font-size: 0.7rem; }
        .badge-active { background-color: #D1FAE5; color: #065F46; }
        .badge-paused { background-color: #FEF3C7; color: #92400E; }
        .badge-cancelled { background-color: #FEE2E2; color: #B91C1C; }
        .footer { margin-top: 2rem; font-size: 0.75rem; color: #6B7280; }
        @media print {
            button { display: none; }
        }
    </style>
</head>
<body>
    <button onclick="window.print()" style="margin-bottom: 12px; padding: 4px 12px; border-radius: 9999px; border: 1px solid #D1D5DB; background:#111827; color:white; cursor:pointer;">Print / Save as PDF</button>

    <h1>PlatePilot Subscription Plan</h1>
    <p class="muted">Fresh fruits & vegetables delivered to your doorstep.</p>

    <div class="section">
        <p><strong>Subscription ID:</strong> ${subscription.id}</p>
        <p><strong>Status:</strong>
            <span class="badge ${
                subscription.status === 'active'
                    ? 'badge-active'
                    : subscription.status === 'paused'
                    ? 'badge-paused'
                    : 'badge-cancelled'
            }">${subscription.status}</span>
        </p>
        <p><strong>Next delivery:</strong> ${nextDate}</p>
        <p><strong>Plan:</strong> ${
            subscription.planType === 'weekly'
                ? 'Weekly'
                : subscription.planType === 'alternate'
                ? 'Alternate days'
                : 'Custom days'
        } (${subscription.daysOfWeek.join(', ')})</p>
        <p><strong>Time slot:</strong> ${
            subscription.timeSlot === 'morning' ? 'Morning' : 'Evening'
        }</p>
    </div>

    <div class="section">
        <h2>Items per delivery</h2>
        <table>
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price / unit</th>
                    <th>Per-delivery total</th>
                </tr>
            </thead>
            <tbody>
                ${itemsRows}
            </tbody>
        </table>
        <div class="totals">
            <p><strong>Per delivery produce cost:</strong> ₹${(subscription.perDeliveryCost || 0).toFixed(
                0
            )}</p>
            <p><strong>Estimated deliveries per week:</strong> ${
                subscription.deliveriesPerWeek || 0
            }</p>
            <p><strong>Estimated weekly produce cost:</strong> ₹${(
                subscription.estimatedWeeklyCost || 0
            ).toFixed(0)}</p>
            <p><strong>Delivery fee per week:</strong> ₹${(
                subscription.deliveryFeePerWeek || 0
            ).toFixed(0)}</p>
            <p><strong>Total weekly:</strong> ₹${(subscription.totalWeeklyCost || 0).toFixed(
                0
            )}</p>
        </div>
    </div>

    <div class="section">
        <h2>Delivery details</h2>
        <p><strong>Address:</strong><br>${subscription.address}</p>
        <p><strong>Phone:</strong> ${subscription.phone}</p>
        <p><strong>Start date:</strong> ${formatDateForDisplay(
            new Date(subscription.startDate)
        )}</p>
    </div>

    <div class="footer">
        <p>Generated by PlatePilot · Subscription Delivery for Fruits & Vegetables</p>
        <p>Keep this receipt for your reference. You can pause or cancel your plan anytime from the Subscription page.</p>
    </div>
</body>
</html>
        `);
        win.document.close();
    }

    // Initialize everything once DOM is ready
    document.addEventListener('DOMContentLoaded', function () {
        const itemsContainer = qs('itemsContainer');
        if (!itemsContainer) return; // Not on subscription page

        initItemsUI();
        initDaysUI();
        calculateSummary();
        renderSubscriptionsList();

        // Live recomputation handlers
        itemsContainer.addEventListener('input', calculateSummary);
        itemsContainer.addEventListener('change', calculateSummary);
        const daysContainer = qs('daysContainer');
        if (daysContainer) {
            daysContainer.addEventListener('change', calculateSummary);
        }
        Array.from(document.querySelectorAll('input[name="planType"]')).forEach((r) =>
            r.addEventListener('change', calculateSummary)
        );
        Array.from(document.querySelectorAll('input[name="timeSlot"]')).forEach((r) =>
            r.addEventListener('change', calculateSummary)
        );

        const confirmBtn = qs('confirmSubscriptionBtn');
        if (confirmBtn) {
            confirmBtn.addEventListener('click', function () {
                const summary = calculateSummary();
                if (!validateForm(summary)) return;

                // Attach computed perDeliveryCost into summary for persistence
                summary.perDeliveryCost = summary.perDeliveryCost || summary.perDeliveryCost === 0
                    ? summary.perDeliveryCost
                    : summary.perDeliveryCost;

                const editingId = confirmBtn.dataset.editingId || null;
                const subscription = buildSubscriptionObject(summary, editingId);
                const list = loadSubscriptions();

                if (editingId) {
                    const idx = list.findIndex((s) => s.id === editingId);
                    if (idx !== -1) {
                        // Preserve status if editing
                        subscription.status = list[idx].status || 'active';
                        subscription.id = list[idx].id;
                        list[idx] = subscription;
                    } else {
                        list.push(subscription);
                    }
                } else {
                    list.push(subscription);
                }

                saveSubscriptions(list);
                renderSubscriptionsList();
                showSuccessScreen(subscription);
                delete confirmBtn.dataset.editingId;
            });
        }

        const refreshBtn = qs('refreshSubscriptionsBtn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', renderSubscriptionsList);
        }
    });
})();

