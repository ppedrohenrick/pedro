// Adicione este script no <head> do seu HTML ou no arquivo JavaScript principal

(function() {
    // Configurações
    const minSwipeDistance = 100; // Distância mínima do swipe para ser detectado (em pixels)
    const homePageUrl = '/'; // URL da sua página inicial - altere conforme necessário
    
    // Variáveis para rastrear o swipe
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Função que lida com o início do toque
    function handleTouchStart(event) {
      touchStartX = event.touches[0].clientX;
    }
    
    // Função que lida com o movimento do toque
    function handleTouchMove(event) {
      // Impede o comportamento padrão de navegação para trás
      if (event.touches[0].clientX < touchStartX) {
        event.preventDefault();
      }
    }
    
    // Função que lida com o fim do toque
    function handleTouchEnd(event) {
      touchEndX = event.changedTouches[0].clientX;
      
      // Detecta se houve um swipe da direita para a esquerda
      if (touchStartX - touchEndX > minSwipeDistance) {
        // Redireciona para a página inicial em vez de voltar
        window.location.href = homePageUrl;
      }
      
      // Reseta as variáveis
      touchStartX = 0;
      touchEndX = 0;
    }
    
    // Adiciona os event listeners
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: false });
    
    // Impede o comportamento de navegação para trás do navegador
    window.addEventListener('popstate', function(event) {
      // Cancela a navegação para trás e redireciona para a home
      window.location.replace(homePageUrl);
    });
    
    // Método adicional para garantir que o gesto de navegação para trás não funcione
    window.history.pushState({page: 'current'}, document.title, window.location.href);
    window.addEventListener('popstate', function() {
      window.history.pushState({page: 'current'}, document.title, window.location.href);
      window.location.replace(homePageUrl);
    });
  })();