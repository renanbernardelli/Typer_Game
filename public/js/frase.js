$('.botao-frase').click(novaFrase);
$('.botao-frase-id').click(buscaFrase);

function novaFrase() {
    $('.spinner').show();
    
    $.get("http://localhost:3000/frases", trocaFrase)
    .fail(function(){
        $('.erro').show();
        setTimeout(function(){
            $('.erro').hide();
        },3000);
    })
    .always(function(){
        $('.spinner').toggle();
    });
}

function trocaFrase(data) {
    let frase = $('.frase');
    let idAleatorio = Math.floor(Math.random() * data.length);

    frase.text(data[idAleatorio].texto);

    atualizaTamanhoFrase();
    atualizaTempoInicial(data[idAleatorio].tempo)
}

function buscaFrase() {
    let fraseId = $('#frase-id').val();
    fraseId -= 1;
    let dados = {id: fraseId};

    $('.spinner').show();

    $.get("http://localhost:3000/frases", dados, escolheFrase)
    .fail(function(){
        $('.erro').show();
        setTimeout(function(){
            $('.erro').hide();
        },3000);
    })
    .always(function(){
        $('.spinner').toggle();
    });
}

function escolheFrase(data) {
    let frase = $('.frase');
    frase.text(data.texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data.tempo);
}