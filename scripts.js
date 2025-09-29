document.addEventListener("DOMContentLoaded", () => {
  // Navegación móvil
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navMenu.classList.toggle("active")
    })

    // Cerrar menú al hacer click en un enlace
    document.querySelectorAll(".nav-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
      })
    })
  }

  // Navegación suave
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        const headerOffset = 80
        const elementPosition = target.offsetTop
        const offsetPosition = elementPosition - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Formulario de contacto
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Obtener valores del formulario
      const nombre = document.getElementById("nombre").value
      const email = document.getElementById("email").value
      const telefono = document.getElementById("telefono").value
      const mensaje = document.getElementById("mensaje").value

      // Validación básica
      if (!nombre || !email || !mensaje) {
        alert("Por favor, completa todos los campos obligatorios.")
        return
      }

      // Validación de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        alert("Por favor, ingresa un email válido.")
        return
      }

      // Simular envío del formulario
      const submitBtn = document.querySelector(".submit-btn")
      const originalText = submitBtn.textContent

      submitBtn.textContent = "Enviando..."
      submitBtn.disabled = true

      // Simular delay de envío
      setTimeout(() => {
        alert("¡Gracias por tu mensaje! Te contactaremos pronto.")

        // Limpiar formulario
        contactForm.reset()

        // Restaurar botón
        submitBtn.textContent = originalText
        submitBtn.disabled = false
      }, 2000)
    })
  }

  // Galería con lightbox
  // Crear lightbox
  const lightbox = document.createElement("div")
  lightbox.className = "lightbox"
  lightbox.innerHTML = `
        <span class="close-lightbox">&times;</span>
        <img src="/placeholder.svg" alt="">
    `
  document.body.appendChild(lightbox)

  const lightboxImg = lightbox.querySelector("img")
  const closeLightbox = lightbox.querySelector(".close-lightbox")

  // Agregar event listeners a las imágenes de la galería
  document.querySelectorAll(".gallery-item img").forEach((img) => {
    img.addEventListener("click", function () {
      lightboxImg.src = this.src
      lightboxImg.alt = this.alt
      lightbox.classList.add("active")
      document.body.style.overflow = "hidden"
    })
  })

  // Cerrar lightbox
  function closeLightboxFunction() {
    lightbox.classList.remove("active")
    document.body.style.overflow = "auto"
  }

  closeLightbox.addEventListener("click", closeLightboxFunction)

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightboxFunction()
    }
  })

  // Cerrar con tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      closeLightboxFunction()
    }
  })

  // Inicializar elementos para animación
  const elements = document.querySelectorAll(".about-card, .product-card, .team-member")
  elements.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(30px)"
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  })

  // Validación en tiempo real del formulario
  const inputs = document.querySelectorAll("#contactForm input, #contactForm textarea")

  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateField(this)
    })

    input.addEventListener("input", function () {
      if (this.classList.contains("error")) {
        validateField(this)
      }
    })
  })

  // Contador de caracteres para textarea
  const textarea = document.getElementById("mensaje")
  if (textarea) {
    const maxLength = 500

    // Crear contador
    const counter = document.createElement("div")
    counter.style.textAlign = "right"
    counter.style.fontSize = "0.9rem"
    counter.style.color = "#7f8c8d"
    counter.style.marginTop = "0.5rem"

    textarea.parentNode.appendChild(counter)

    function updateCounter() {
      const remaining = maxLength - textarea.value.length
      counter.textContent = `${remaining} caracteres restantes`

      if (remaining < 50) {
        counter.style.color = "#ff6b6b"
      } else {
        counter.style.color = "#7f8c8d"
      }
    }

    textarea.addEventListener("input", updateCounter)
    textarea.setAttribute("maxlength", maxLength)
    updateCounter()
  }

  // Lazy loading para imágenes
  const images = document.querySelectorAll("img")

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.style.opacity = "0"
        img.style.transition = "opacity 0.3s ease"

        img.onload = () => {
          img.style.opacity = "1"
        }

        observer.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
})

// Animaciones al hacer scroll
function animateOnScroll() {
  const elements = document.querySelectorAll(".about-card, .product-card, .team-member")

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top
    const elementVisible = 150

    if (elementTop < window.innerHeight - elementVisible) {
      element.style.opacity = "1"
      element.style.transform = "translateY(0)"
    }
  })
}

window.addEventListener("scroll", animateOnScroll)

// Header transparente al hacer scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (header) {
    if (window.scrollY > 100) {
      header.style.background = "rgba(255, 255, 255, 0.95)"
      header.style.backdropFilter = "blur(10px)"
    } else {
      header.style.background = "var(--white)"
      header.style.backdropFilter = "none"
    }
  }
})

function validateField(field) {
  const value = field.value.trim()
  let isValid = true

  // Remover clases de error previas
  field.classList.remove("error")

  // Validar según el tipo de campo
  if (field.hasAttribute("required") && !value) {
    isValid = false
  } else if (field.type === "email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      isValid = false
    }
  }

  // Aplicar estilos de error
  if (!isValid) {
    field.classList.add("error")
    field.style.borderColor = "#ff6b6b"
  } else {
    field.style.borderColor = "#4a7c59"
  }

  return isValid
}

// Efecto parallax sutil en hero
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroImage = document.querySelector(".hero-image img")

  if (heroImage && scrolled < window.innerHeight) {
    heroImage.style.transform = `translateY(${scrolled * 0.3}px)`
  }
})
