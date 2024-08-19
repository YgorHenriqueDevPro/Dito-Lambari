<script>
    $(document).ready(function() {
        // Função para atualizar o total do carrinho
        function updateCartTotal() {
            let total = 0;
            $('#cart li').each(function() {
                const priceText = $(this).find('.price').text().replace('R$', '');
                const quantity = $(this).find('.quantity').text();
                total += parseFloat(priceText) * parseInt(quantity);
            });
            $('#cart-total').text('R$' + total.toFixed(2));
        }

        // Função para adicionar itens ao carrinho
        function addToCart(name, quantity, price) {
            var cart = $('#cart');
            var existingItem = cart.find(`li:contains(${name})`);
            if (existingItem.length) {
                var existingQuantity = existingItem.find('.quantity').text();
                var newQuantity = parseInt(existingQuantity) + parseInt(quantity);
                existingItem.find('.quantity').text(newQuantity);
                existingItem.find('.total-price').text('R$' + (parseFloat(price.replace('R$', '')) * newQuantity).toFixed(2));
            } else {
                var cartItem = `<li>${name} - <span class="quantity">${quantity}</span> x <span class="price">${price}</span> <a href="#" class="btn btn-danger btn-sm remove-item">Remover</a></li>`;
                cart.append(cartItem);
            }
            updateCartTotal(); // Atualiza o total do carrinho após adicionar o item
        }

        // Atualiza o total do preço do item no card quando a quantidade é alterada
        $('.quantity-input').on('input', function() {
            var price = parseFloat($(this).closest('.card-body').find('.item-price').text().replace('R$', ''));
            var quantity = parseInt($(this).val());
            var total = (price * quantity).toFixed(2);
            $(this).closest('.card-body').find('.total-price').text('R$' + total);
        });

        // Adiciona o item ao carrinho quando o botão de adicionar é clicado
        $('.order-button').on('click', function(e) {
            e.preventDefault(); // Previne o comportamento padrão do link
            var card = $(this).closest('.card');
            var name = card.find('.card-title').text();
            var quantity = card.find('.quantity-input').val();
            var price = card.find('.total-price').text();
            addToCart(name, quantity, price);
        });

        // Limpa todos os itens do carrinho
        $('#clear-cart').on('click', function(e) {
            e.preventDefault(); // Previne o comportamento padrão do link
            $('#cart').empty(); // Remove todos os itens do carrinho
            updateCartTotal(); // Atualiza o total do carrinho
        });

        // Remove item individualmente do carrinho
        $('#cart').on('click', '.remove-item', function(e) {
            e.preventDefault(); // Previne o comportamento padrão do link
            $(this).closest('li').remove(); // Remove o item da lista
            updateCartTotal(); // Atualiza o total do carrinho após remover o item
        });

        // Exibe ou oculta campos de pagamento com base na seleção
        $('#formaPagamento').change(function() {
            var pagamento = $(this).val();
            if (pagamento === 'credito') {
                $('#cartaoCredito').removeClass('d-none');
                $('#pix').addClass('d-none');
            } else if (pagamento === 'pix') {
                $('#pix').removeClass('d-none');
                $('#cartaoCredito').addClass('d-none');
            }
        });
    });
</script>
