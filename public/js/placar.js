$('.botao-placar').click(mostraPlacar);
$('.botao-sync').click(sincronizaPlacar);

function inserePlacar() {
    const corpoTabela = $('.placar').find('tbody');
    const usuario = $('.usuarios').val();
    const contadorPalavras = $('.contador-palavras').text();

    //const botaoRemover = '<a href="#" class="botao-remover"><i class="small material-icons">delete</i></a>';

    /*
    ! A linha poderia ser feita como uma string, porém quando temos um elemento com uma determinada função dentro dela, esse elemento não funciona.
    const linha = '<tr>' +
    '<td>' + usuario + '</td>' + 
    '<td>' + contadorPalavras + '</td>' + 
    '<td>' + botaoRemover + '</td>' + 
    '</tr>';
    */

    const linha = novaLinha(usuario, contadorPalavras);
    linha.find('.botao-remover').click(removeLinha);
    corpoTabela.append(linha);//!"append()" insere a linha no final da tabela, mas poderia usar "prepend()" para inserir a linha no inicio da tabela.
    $('.placar').slideDown(500);
    scrollPlacar();
};

function scrollPlacar() {
    let posicaoPlacar = $('.placar').offset().top;
    $('html, body').animate(
    {
        scrollTop: posicaoPlacar+'px'
    },1000);
};

function novaLinha(usuario, palavras) {
    const linha = $('<tr>'); //aqui o jQuery está criando um elemento html de fato.
    const colunaUsuario = $('<td>').text(usuario);
    const colunaPalavras = $('<td>').text(palavras);
    const colunaRemover = $('<td>');

    const link = $('<a>').addClass('botao-remover').attr('href', '#');
    const icone = $('<i>').addClass('small').addClass('material-icons').text('delete');

    link.append(icone);
    colunaRemover.append(link);
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
};

function removeLinha() {
    event.preventDefault();
    const linha = $(this).parent().parent();
    linha.fadeOut(500);
    setTimeout(function () {
        linha.remove();
    },500);
};

function mostraPlacar() {
    $('.placar').stop().slideToggle(600);
}

function sincronizaPlacar() {
    const placar = [];
    const linhas = $('tbody>tr'); //! é possível acessar qualquer elemento do html de forma direta (>) ou não.
    linhas.each(function(){
        const usuario = $(this).find('td:nth-child(1)').text(); //! o "this" foi transformado em objeto jQuery e depois usado o .find() com as propriedades CSS para acessar o filho do "tr"
        const pontos = $(this).find('td:nth-child(2)').text();
        const score = {
            usuario: usuario,
            pontos: pontos
        }
        placar.push(score);
    });

    const dados = {
        placar: placar
    };
    $.post('http://localhost:3000/placar', dados, function(){
        console.log('scoreboard saved');
        $('.tooltip').tooltipster('open').tooltipster('content', 'Sucesso ao sincronizar');
    })
    .fail(function () {
        $('.tooltip').tooltipster('open').tooltipster('content', 'Falha ao sincronizar');
    })
    .always(function () { 
        setTimeout(function () {
            $('.tooltip').tooltipster('close');
        },1200);
    });
}

function atualizaPlacar() {
    $.get('http://localhost:3000/placar', function (data) {
        $(data).each(function(){
            const linha = novaLinha(this.usuario, this.pontos);
            linha.find('.botao-remover').click(removeLinha);
            $('tbody').append(linha);
        });
    });
}