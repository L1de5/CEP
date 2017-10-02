const form = document.querySelector('form');
const input = document.querySelector('#cep');
const divResultado = document.querySelector('div#resultado');
const scriptTemplate = document.querySelector('#template');

form.addEventListener('submit', function(e) {
  busca(form.cep.value);
  e.preventDefault();
});
form.addEventListener('reset', function(){
  this.reset();
});
input.addEventListener('keyup', function(e){
  const n = e.key;
  if((n <= 9 && n >= 0)){
    
    const r = input.value + n;
    var t = '';
    for(i = 1; i < 9; i++){
      t += r[i];
    }
    input.value = t;
  }
  
});
function ajax(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = callback;
  xhr.send();
}

function busca(cep) { // cep: 96201460
  const url = `http://viacep.com.br/ws/${cep}/json/`;
  ajax(url, function(e) {
    printa(JSON.parse(e.target.response));
  });
}

function printa(json) {
  const template = scriptTemplate.innerText;
  const handlebars = Handlebars.compile(template);
  if(json.erro != true){
    const html = handlebars(json);
    divResultado.innerHTML = html;
  }else{
    erro("Esse CEP não existe!!");
  }
}

function isNumberKey(evt) {
  if (evt.keyCode != 8){
    var charCode = (evt.which) ? evt.which : evt.keyCode;
  }
  if ((charCode < 48 || charCode > 57)) return false;

  return true;
}

function erro(mensagem) {
  var source   = document.querySelector("#danger").innerHTML;
  var template = Handlebars.compile(source);
  var html = template({ mensagem: mensagem });
  document.querySelector('div.mensagem').innerHTML = html;
}



