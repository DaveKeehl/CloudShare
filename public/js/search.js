function search(){

  var input = document.getElementById('myInput');
  var filter = input.value.toUpperCase();
  var body = document.getElementById('table');
  var tr = body.getElementsByTagName('tr');

  for(i = 0; i < tr.length; i++){
    var a = tr[i].getElementsByTagName('a')[0];
    var txtValue = a.textContent || a.innerText;
    if(txtValue.toUpperCase().indexOf(filter) > - 1){
      tr[i].style.display = '';
    } else{
      tr[i].style.display = 'none';
    }
  }
  // for(i = 0; i< tr.length; i++){
  //   var p = tr[i].getElementsByTagName('p')[0];
  //   var tags = p.textContent || p.innerText;
  //   if(tags.toUpperCase().indexOf(filter) > - 1){    \\this should be work for tags but it doesn't To CHECK.
  //     tr[i].style.display = '';
  //   } else{
  //     tr[i].style.display = 'none';
  //   }
  // }
}
