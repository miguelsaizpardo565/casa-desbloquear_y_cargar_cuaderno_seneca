document.querySelectorAll('input[id^="CRITERIO"]').forEach(e => {
    e.removeAttribute('readonly');
    e.removeAttribute('disabled');
    e.style.display = '';
    e.setAttribute('pattern', '(|10|[1-9]((\\.[0-9]{1,2})?))');
}); 
