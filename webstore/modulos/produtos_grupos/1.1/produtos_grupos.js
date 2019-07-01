$(document).ready(function(){
	try{
		if ($("#HdEtapaLoja").val() == "HOME") {
			isReady("cfg['estrutura']", "ProdutosGrupos()");
		}
	} catch (e) { console.log(e.message); }
});

function ProdutosGrupos() {
	ApiWS.ListaProdutosGrupos("ProdutosGruposRetorno");
}
function ProdutosGruposRetorno() {

    try {

        var OBJETO = ApiWS.Json;

        var prodGroupDots = false;

        if (typeof over_produtos_grupos !== 'undefined') { try { eval(over_produtos_grupos); return; } catch (e) { console.log(e.message); } }

        if (typeof varprodGroupDots !== 'undefined') { prodGroupDots = varprodGroupDots; }

        objetos.ProdutosGrupos = OBJETO;

        var obj = jQuery.parseJSON(OBJETO);

        var qtdGrupos = "";
        var prods_linha = '';
        var template = $('#template').html();

        if (cfg['produtos_linha'] == 0 && cfg['menu_lateral_home'] == true) {
            prods_linha = 3;
        } else if (cfg['produtos_linha'] == 0 && cfg['menu_lateral_home'] == false) {
            prods_linha = 4;
        } else {
            prods_linha = cfg['produtos_linha'];
        }

        if (prodsLinha != null && prodsLinha != undefined && prodsLinha > 0) {
            prods_linha = prodsLinha;
        }

        if (obj.grupos != null && obj.grupos != undefined && obj.grupos.length > 0) {

            for (a = 0; a < obj.grupos.length; a++) {
                var content = "";
                qtdGrupos++;
                content += '<div class="div-grupo grupo-' + qtdGrupos + ' col-xs-12 no-gutter" id="cod-grupo-' + obj.grupos[a].codigo + '" data-grupo-loja><div class="titulo-grupo">';
                content += '<h3>' + obj.grupos[a].nome + '</h3><span class="arrow">';
                content += '<i class="fa fa-angle-left left-arrow"></i>';
                content += '<i class="fa fa-angle-right right-arrow"></i>';
                content += '</span></div>';

                content += '<ul class="lista-grupo" id="lista-grupo-' + obj.grupos[a].codigo + '">';

                var objProdutos = obj.grupos[a].produtos;
                if (objProdutos != null && objProdutos != undefined && objProdutos.length > 0) {
                    for (b = 0; b < objProdutos.length; b++) {
                        content += BlocoProduto(objProdutos[b], template);
                    }
                }

                content += '</ul></div>';

                $('#preloader').fadeOut('fast');
                $('#produtos-grupos').append(content);
                blocoHeight('#produtos-grupos');

                // verifica se a quantidade de itens é maior do que o slider em sí
                $('#lista-grupo-' + obj.grupos[a].codigo).on('init', function (event, slick, direction) {
                    if ($('#lista-grupo-' + obj.grupos[a].codigo + ' .list-item').length <= prods_linha) {

                        // se não há scroll, remove as setas
                        $('#cod-grupo-' + obj.grupos[a].codigo + ' .arrow').hide();

                    }
                });

                $('#lista-grupo-' + obj.grupos[a].codigo).slick({
                    infinite: true,
                    slidesToShow: prods_linha,
                    autoplay: false,
                    prevArrow: $('#cod-grupo-' + obj.grupos[a].codigo + ' .left-arrow'),
                    nextArrow: $('#cod-grupo-' + obj.grupos[a].codigo + ' .right-arrow'),
                    dots: prodGroupDots,
                    responsive: [
					{
					    breakpoint: 992,
					    settings: {
					        slidesToShow: 3,
					        infinite: true
					    }
					},
					{
					    breakpoint: 768,
					    settings: {
					        slidesToShow: 2
					    }
					},
					{
					    breakpoint: 375,
					    settings: {
					        slidesToShow: 1
					    }
					}],
                });
            }

            nomeProd("#produtos-grupos");

        } else {

            try {
                if (typeof modVitrineOn == 'undefined') {
                    ProdutosHome();
                }
            } catch (e) { }

        }

        if (typeof call_after_produtos_grupos !== 'undefined') { try { eval(call_after_produtos_grupos); } catch (e) { console.log("Falha call_after_produtos_grupos" + e.message); } }

    } catch (e) { console.log('ProdutosGruposRetorno: ' + e.message); }

}