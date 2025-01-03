calculateBtn = document.getElementById('calculate-button');

calculateBtn.addEventListener('click', function() {
    let gpa = document.getElementById('gpa').value;
    let credits = document.getElementById('credits').value;
    console.log(credits);
    console.log(gpa);
});

parseClasses = function() {
    let classes = document.getElementById('classes').value;
    classes = classes.split('\n');
    console.log(classes);
}
