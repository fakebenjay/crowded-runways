function getOffset(el) {
	const rect = el.getBoundingClientRect();
	return {
		left: rect.left + window.scrollX,
		top: rect.top + window.scrollY,
		bottom: rect.bottom + window.scrollY,
		right: rect.right + window.scrollY
	};
}