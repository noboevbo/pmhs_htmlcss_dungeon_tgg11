const noop = () => { };

function closeDialogOnOutsideClick(event) {
    var rect = event.target.getBoundingClientRect();
    var isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height
        && rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
    if (!isInDialog) {
        event.target.close();
    }
}

export { noop, closeDialogOnOutsideClick };
