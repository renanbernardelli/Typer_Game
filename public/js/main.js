const campo = $('.campo-digitacao');
let tempoInicial = $('.tempo-digitacao').text();

$(function(){
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    verificaDigitacao();
    $('.botao-reiniciar').click(reiniciaJogo);
    atualizaPlacar();
    $('.usuarios').selectize({
        create: true,
        sortField: 'text'
    });

    $('.tooltip').tooltipster({
        trigger: 'custom'
    });
});

function atualizaTempoInicial(tempo) {
    tempoInicial = tempo;
    $('.tempo-digitacao').text(tempo);
}

function atualizaTamanhoFrase() {
    const frase = $('.frase').text();
    const numPalavras = frase.split(' ').length;
    const tamanhoPalavras = $('#tamanho-palavras');
    tamanhoPalavras.text(numPalavras);
};

function inicializaContadores() {
    campo.on('input', function(){
        const conteudo = campo.val();
    
        const qtdPalavras = conteudo.split(/\S+/).length -1;
        $('.contador-palavras').text(qtdPalavras);
    
        const conteudoSemEspaco = conteudo.replace(/\s+/g,'');
    
        const qtdCaracteres = conteudoSemEspaco.length;
        $('.contador-caracteres').text(qtdCaracteres);
    });
};

function inicializaCronometro() {
    campo.one('input', function(){
        let tempoRestante = $('.tempo-digitacao').text();
        $('.botao-reiniciar').attr('disabled', true);
        verificaDigitacao();
        const cronometroID = setInterval(function(){
            tempoRestante--;
            $('.tempo-digitacao').text(tempoRestante);
            if (tempoRestante < 1) {
                clearInterval(cronometroID);
                finalizaJogo();
            }
        },1000);
    });
};

function reiniciaJogo(){
    campo.attr('disabled', false);
    campo.val('');
    $('.contador-palavras').text('0');
    $('.contador-caracteres').text('0');
    $('.tempo-digitacao').text(tempoInicial);
    inicializaCronometro();
    campo.removeClass('campo-desativado');
    campo.removeClass('borda-vermelha');
    campo.removeClass('borda-verde');
};

function verificaDigitacao(){
    campo.on('input', function(){
        const frase = $('.frase').text();
        const digitado = campo.val();

        //! Com JS antigo:
        const comparavel = frase.substr(0, digitado.length);
        if (digitado == comparavel) {
            campo.addClass('borda-verde');
            campo.removeClass('borda-vermelha');
                
        }
        else{
            campo.addClass('borda-vermelha');
            campo.removeClass('borda-verde');
        }

        /*
        ! Com ECMA Script 6:
        if (frase.startsWith(digitado)) {
            campo.addClass('borda-verde');
            //campo.removeClass('borda-vermelha');
                
        }
        else{
            campo.addClass('borda-vermelha');
            //campo.removeClass('borda-verde');
        }
        */
    });
};

function finalizaJogo() {
    campo.attr('disabled', true);
    $('.botao-reiniciar').attr('disabled', false);
    campo.addClass('campo-desativado');
    inserePlacar();
};