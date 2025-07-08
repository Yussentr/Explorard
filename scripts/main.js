
// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // Inicializar funcionalidades
    initDarkMode();
    initSmoothScrolling();
    initContactForm();
    initHoverEffects();
    initCarousel();
    initNavbar();
    
    // Mostrar modal de bienvenida después de 2 segundos
    setTimeout(() => {
        const welcomeBtn = document.getElementById('showWelcomeModal');
        if (welcomeBtn) {
            welcomeBtn.addEventListener('click', () => {
                const welcomeModal = new bootstrap.Modal(document.getElementById('welcomeModal'));
                welcomeModal.show();
            });
        }
    }, 2000);
});

// Funcionalidad de modo oscuro
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const icon = darkModeToggle.querySelector('i');
    
    // Verificar preferencia guardada
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-bs-theme', savedTheme);
        updateDarkModeIcon(savedTheme === 'dark', icon);
    }
    
    darkModeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-bs-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateDarkModeIcon(newTheme === 'dark', icon);
        
        // Efecto visual al cambiar tema
        body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            body.style.transition = '';
        }, 300);
    });
}

function updateDarkModeIcon(isDark, icon) {
    if (isDark) {
        icon.className = 'bi bi-sun-fill';
    } else {
        icon.className = 'bi bi-moon-fill';
    }
}

// Navegación suave
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Cerrar menú móvil si está abierto
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });
}

// Formulario de contacto
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Validación básica
            if (!name || !email || !message) {
                showAlert('Por favor, completa todos los campos.', 'warning');
                return;
            }
            
            // Simular envío del formulario
            showAlert(`¡Gracias ${name}! Tu mensaje ha sido enviado. Te contactaremos pronto a ${email}.`, 'success');
            contactForm.reset();
        });
    }
}

// Efectos hover dinámicos
function initHoverEffects() {
    // Efecto en los títulos
    document.querySelectorAll('h1, h2, h3, h4, h5').forEach(title => {
        title.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        title.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Efectos en botones
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
}

// Carrusel personalizado
function initCarousel() {
    const carousel = document.querySelector('#heroCarousel');
    if (carousel) {
        // Auto-play más lento
        const bsCarousel = new bootstrap.Carousel(carousel, {
            interval: 5000,
            pause: 'hover'
        });
        
        // Efecto de pausa al hacer hover
        carousel.addEventListener('mouseenter', () => {
            bsCarousel.pause();
        });
        
        carousel.addEventListener('mouseleave', () => {
            bsCarousel.cycle();
        });
    }
}

// Navbar dinámico
function initNavbar() {
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Ocultar/mostrar navbar al hacer scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        // Cambiar opacidad del navbar
        if (scrollTop > 50) {
            navbar.style.backgroundColor = scrollTop > 100 ? 
                'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.9)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = '';
            navbar.style.backdropFilter = '';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    
    // Actualizar enlace activo en navbar
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Funciones de utilidad

// Mostrar alertas personalizadas
function showAlert(message, type = 'info') {
    // Crear elemento de alerta
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alertDiv.style.cssText = `
        top: 100px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 8px 20px rgba(0,0,0,0.2);
    `;
    
    alertDiv.innerHTML = `
        <i class="bi bi-${getAlertIcon(type)} me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
    
    // Animación de entrada
    setTimeout(() => {
        alertDiv.style.transform = 'translateX(0)';
    }, 10);
}

function getAlertIcon(type) {
    const icons = {
        'success': 'check-circle-fill',
        'warning': 'exclamation-triangle-fill',
        'danger': 'x-circle-fill',
        'info': 'info-circle-fill'
    };
    return icons[type] || icons['info'];
}

// Función para mostrar información de destinos
window.showAlert = function(destino) {
    const messages = {
        'Punta Cana': 'Punta Cana te ofrece más de 50km de playas vírgenes, resorts de clase mundial y actividades acuáticas sin fin. ¡El paraíso te espera!',
        'Samaná': 'Samaná es famosa por sus ballenas jorobadas (enero-marzo), cascadas espectaculares como El Limón, y playas de ensueño como Playa Rincón.',
        'Santo Domingo': 'La primera ciudad de América te invita a caminar por calles de 500 años de historia, museos únicos y una vibrante vida nocturna.'
    };
    
    showAlert(messages[destino] || 'Descubre este increíble destino con Explora RD', 'info');
};

// Efecto parallax para hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSections = document.querySelectorAll('.hero-section');
    
    heroSections.forEach(hero => {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    });
});

// Animaciones al hacer scroll (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animaciones
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.card, .service-icon, article');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Preloader (opcional)
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.remove();
        }, 500);
    }
});

// Funciones globales para eventos onclick
window.toggleTheme = function() {
    document.getElementById('darkModeToggle').click();
};

// Analytics y tracking (simulado)
function trackEvent(action, category = 'user_interaction') {
    console.log(`Event tracked: ${action} in ${category}`);
    // Aquí iría el código real de Google Analytics o similar
}

// Trackear clics en botones importantes
document.addEventListener('click', (e) => {
    if (e.target.matches('.btn-primary')) {
        trackEvent('button_click', 'engagement');
    }
    if (e.target.matches('.social-link')) {
        trackEvent('social_click', 'social_media');
    }
});

// Manejar errores de JavaScript
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // En producción, enviar errores a un servicio de logging
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log(`Page loaded in ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
        }, 0);
    });
}