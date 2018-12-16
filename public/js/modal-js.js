var inputs = document.querySelectorAll('#uploadModal input');
Array.prototype.forEach.call(inputs, function(input) {

    var label = input.nextElementSibling;
    var labelVal = label.innerHTML;

    input.addEventListener('change', function(e) {
        var fileName = '';
        if (this.files && this.files.length > 1 ) {
            fileName = this.files.length + " " + this.getAttribute('data-multiple-caption');
        }
        else {
            fileName = e.target.value.split('\\').pop();
        }
        if (fileName) {
            label.querySelector('p').innerHTML = fileName;
        } else {
            label.innerHTML = labelVal;
        }
    });
});
