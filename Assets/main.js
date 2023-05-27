const menu = document.getElementById("menu-toggle");
const navBarList = document.querySelector(".navbar-list");
const productsContainer = document.querySelector(".productos-container");
const showMoreBtn = document.querySelector(".btn-load");
const categoriesContainer = document.querySelector(".category-container");
const categoriesList = document.querySelectorAll(".category");

const cartBtn = document.querySelector(".cart-label");
const cartMenu = document.querySelector(".cart");
const menuBtn = document.querySelector(".menu-label");
const barsMenu = document.querySelector(".navbar-list");
const overlay = document.querySelector(".overlay");

const productsCart = document.querySelector(".cart-container");
const total = document.querySelector(".total");
const successModal = document.querySelector(".add-modal");
const buyBtn = document.querySelector(".btn-buy");
const deleteBtn = document.querySelector(".btn-delete");
const cartBubble = document.querySelector(".cart-bubble");

const registerForm = document.getElementById("form-contacto");
const nameInput = document.getElementById("form-nombre");
const dirInput = document.getElementById("form-direccion");
const emailInput = document.getElementById("form-email");
const phoneInput = document.getElementById("form-tel");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveCart = () => {
	localStorage.setItem("cart", JSON.stringify(cart));
};

//renderizado
const createProductTemplate = (product) => {
    const {id, name, precio, category, icecreamImg } = product;
    return `
    <div class="productos-it">
        <img src="${icecreamImg}" alt="${name}">
        <h3>${name}</h3>
        <span>$ ${precio}</span>
        <button
            class = "btn-add"
            data-id = "${id}"
            data-name = "${name}"
            data-precio = "${precio}"
            data-img = "${icecreamImg}"
        >
        Agregar
        </button>
    </div>
`;
};


const renderProducts = (producList) => {
    productsContainer.innerHTML += producList.map(createProductTemplate).join("");
};


const isLastIndexOf = () => {
	return appState.currentProductsIndex === appState.productsLimit - 1;
};

const showMoreProducts = () => {
	appState.currentProductsIndex += 1;
	let { products, currentProductsIndex } = appState;
	renderProducts(products[currentProductsIndex]);
	if (isLastIndexOf()) {
		showMoreBtn.classList.add("hidden");
	}
};

//filtros
const isInactiveFilterBtn = (element) => {
	return (
		element.classList.contains("category") &&
		!element.classList.contains("active")
	);
};

const changeBtnActiveState = (selectedCategory) => {
	const categories = [...categoriesList];
	categories.forEach((categoryBtn) => {
		if (categoryBtn.dataset.category !== selectedCategory) {
			categoryBtn.classList.remove("active");
			return;
		}
		categoryBtn.classList.add("active");
	});
};

const setShowMoreVisibility = () => {
	if (!appState.activeFilter) {
		showMoreBtn.classList.remove("hidden");
		return;
	}
	showMoreBtn.classList.add("hidden");
};

const changeFilterState = (btn) => {
	appState.activeFilter = btn.dataset.category;
	changeBtnActiveState(appState.activeFilter);
	setShowMoreVisibility();
};

const renderFilteredProducts = () => {
	const filteredProducts = productsData.filter((product) => {
		return product.category === appState.activeFilter;
	});
	renderProducts(filteredProducts);
};

const applyFilter = ({ target }) => {
	//Chequear que sea boton y no este activo
	if (!isInactiveFilterBtn(target)) {
		return;
	}
	//cambiar el estado del filtro
	changeFilterState(target);

	//si hay filtro activo, renderizo prod filtrados
	productsContainer.innerHTML = "";
	if (appState.activeFilter) {
		renderFilteredProducts();
		appState.currentProductsIndex = 0;
		return;
	}
	//Si no hay filtro activo, renderizo 1er array
	renderProducts(appState.products[0]);
};


// logica menu y carrito
const toggleCart = () => {
	cartMenu.classList.toggle("open-cart");
	if (barsMenu.classList.contains("open-menu")) {
		barsMenu.classList.remove("open-menu");
		return;
	}
	overlay.classList.toggle("show-overlay");
};

const toggleMenu = () => {
	barsMenu.classList.toggle("open-menu");
	if (cartMenu.classList.contains("open-cart")) {
		cartMenu.classList.remove("open-cart");
		return;
	}
	overlay.classList.toggle("show-overlay");
};

const closeOnScroll = () => {
	if (
		!barsMenu.classList.contains("open-menu") &&
		!cartMenu.classList.contains("open-cart")
	) {
		return;
	}
	barsMenu.classList.remove("open-menu");
	cartMenu.classList.remove("open-cart");
	overlay.classList.remove("show-overlay");
};

const closeOnClick = (e) => {
	if (!e.target.classList.contains("navbar-link")) {
		return;
	}
	barsMenu.classList.remove("open-menu");
	overlay.classList.remove("show-overlay");
};

const closeOnOverlayClick = () => {
	barsMenu.classList.remove("open-menu");
	cartMenu.classList.remove("open-cart");
	overlay.classList.remove("show-overlay");
};


//LOGICA DEL CARRITO

const createCartProductTemplate = (cartProduct) => {
	const { id, name, precio, img, quantity } = cartProduct;
	return `
	<div class="cart-item">
		<img src="${img}" alt="prod del carrito">
		<div class="item-info">
			<h3 class="item-title">${name}</h3>
			<span class="item-price">$ ${precio}</span>
		</div>
		<div class="item-handler">
			<span class="quantity-handler down" data-id=${id}>-</span>
			<span class="item-quantity">${quantity}</span>
			<span class="quantity-handler up" data-id=${id}>+</span>
		</div>
	</div>
	`;
};

const renderCart = () => {
	if (!cart.length) {
		productsCart.innerHTML = `<p class="empty-msg">No hay productos en el carrito.</p>`;
		return;
	}
	productsCart.innerHTML = cart.map(createCartProductTemplate).join("");
};

const getCartTotal = () => {
	return cart.reduce((acc, val) => {
		return acc + Number(val.precio) * Number(val.quantity);
	}, 0);
};

const showCartTotal = () => {
	total.innerHTML = `$ ${getCartTotal().toFixed(2)}`;
};

const createProductData = (product) => {
	const { id, name, precio, img } = product;
	return { id, name, precio, img };
};

const isExistingCartProduct = (productId) => {
	return cart.find((item) => {
		return item.id === productId;
	});
};

const addUnitToProduct = (product) => {
	cart = cart.map((cartProduct) => {
		return cartProduct.id === product.id
			? { ...cartProduct, quantity: cartProduct.quantity + 1 }
			: cartProduct;
	});
};


const showSuccessModal = (msg) => {
	successModal.classList.add("active-modal");
	successModal.textContent = msg;
	setTimeout(() => {
		successModal.classList.remove("active-modal");
	}, 1500);
};

const createCartProduct = (product) => {
	cart = [
		...cart,
		{
			...product,
			quantity: 1,
		},
	];
};


const disableBtn = (btn) => {
	if (!cart.length) {
		btn.classList.add("disabled");
	} else {
		btn.classList.remove("disabled");
	}
};

const renderCartBubble = () => {
	cartBubble.textContent = cart.reduce((acc, val) => {
		return acc + val.quantity;
	}, 0);
};


const updateCartState = () => {
	//Guardar carrito en LC
	saveCart();
	//Renderizar Carrito
	renderCart();
	//Mostrar el total del carrito
	showCartTotal();
	//Chequear disable de botones
	disableBtn(buyBtn);
	disableBtn(deleteBtn);
	//Render burbuja del cart
	renderCartBubble();
};








const addProduct = (e) => {
	if (!e.target.classList.contains("btn-add")) {
		return;
	}
	const product = createProductData(e.target.dataset);
	//si el producto ya existe
	if (isExistingCartProduct(product.id)) {
		//agregamos unidad al producto
		addUnitToProduct(product);
		//damos feedback
		showSuccessModal("Se agregó una unidad del producto al carrito");
	} else {
		//Si el producto no existe
		//Creamos el nuevo producto en el array
		createCartProduct(product);
		//damos feedback
		showSuccessModal("El producto se ha agregado al carrito");
	}

	//actualizamos data del carrito
	updateCartState();
};

const removeProductFromCart = (existingProduct) => {
	cart = cart.filter((product) => {
		return product.id !== existingProduct.id;
	});
	updateCartState();
};

const substractProductUnit = (existingProduct) => {
	cart = cart.map((product) => {
		return product.id === existingProduct.id
			? { ...product, quantity: Number(product.quantity) - 1 }
			: product;
	});
};

const handleMinusBtnEvent = (id) => {
	const existingCartProduct = cart.find((item) => item.id === id);

	if (existingCartProduct.quantity === 1) {
		//Eliminar producto
		if (window.confirm("¿Desea eliminar el producto del carrito?")) {
			removeProductFromCart(existingCartProduct);
		}
		return;
	}
	//Sacarle unidad al producto
	substractProductUnit(existingCartProduct);
};

const handlePlusBtnEvent = (id) => {
	const existingCartProduct = cart.find((item) => item.id === id);
	addUnitToProduct(existingCartProduct);
};


const handleQuantity = (e) => {
	if (e.target.classList.contains("down")) {
		//Manejamos evento de boton -
		handleMinusBtnEvent(e.target.dataset.id);
	} else if (e.target.classList.contains("up")) {
		//Manejamos evento de boton +
		handlePlusBtnEvent(e.target.dataset.id);
	}
	//Actualizamos estado de carrito
	updateCartState();
};

const resetCartItem = () => {
	cart = [];
	updateCartState();
};

const completeCartAction = (confirmMsg, successMsg) => {
	if (!cart.length) return;

	if (window.confirm(confirmMsg)) {
		resetCartItem();
		alert(successMsg);
	}
};

const completeBuy = () => {
	completeCartAction("¿Desea completar su compra?", "¡Gracias por su compra!");
};

const deleteCart = () => {
	completeCartAction(
		"¿Desea vaciar el carrito?",
		"No hay productos en el carrito"
	);
};


// Validación formulario

//---------------Funciones auxiliares----------------

const isEmpty = (input) => {
	return !input.value.trim().length;
};

const isBetween = (input, min, max) => {
	return input.value.length >= min && input.value.length <= max;
};

const isEmailValid = (input) => {
	const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
	return re.test(input.value.trim());
};


const isPassSecure = (input) => {
	const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
	return re.test(input.value.trim());
};

const isPhoneValid = (input) => {
	const re = /^[0-9]{10}$/;
	return re.test(input.value.trim());
};

const showError = (input, message) => {
	const formField = input.parentElement;
	formField.classList.remove("success");
	formField.classList.add("error");
	const error = formField.querySelector("small");
	error.style.display = "block";
	error.textContent = message;
};

const showSuccess = (input) => {
	const formField = input.parentElement;
	formField.classList.remove("error");
	formField.classList.add("success");
	const error = formField.querySelector("small");
	error.style.display = "none";
	error.textContent = "";
};

//-------------Funciones de validación de inputs-------------

const checkTextInput = (input) => {
	let valid = false;
	const minCharacters = 3;
	const maxCharacters = 16;
	//si el input esta vacio, mostramos error
	if (isEmpty(input)) {
		showError(input, "Este campo es obligatorio");
		return;
	}
	//Si el input tiene mal la cantidad de caracteres, mostramos error
	if (!isBetween(input, minCharacters, maxCharacters)) {
		showError(
			input,
			`Este campo debe tener entre ${minCharacters} y ${maxCharacters} caracteres`
		);
		return;
	}
	showSuccess(input);
	valid = true;
	return valid;
};

const checkEmail = (input) => {
	let valid = false;

	if (isEmpty(input)) {
		showError(input, "El email es obligatorio");
		return;
	}
	//Si es un mail
	if (!isEmailValid(input)) {
		showError(input, "El mail no es válido");
		return;
	}

	showSuccess(input);
	valid = true;
	return valid;
};

const checkPhone = (input) => {
	let valid = false;

	if (isEmpty(input)) {
		showError(input, "El teléfono es obligatorio");
		return;
	}
	if (!isPhoneValid(input)) {
		showError(input, "El telefono no es válido");
		return;
	}

	showSuccess(input);
	valid = true;
	return valid;
};


// ---------validación general y almacenamiento de datos--------

const submitHandler = (e) => {
	e.preventDefault();
	let isNameValid = checkTextInput(nameInput);
	let isDirValid = checkTextInput(dirInput);
	let isEmailValid = checkEmail(emailInput);
	let isPhoneValid = checkPhone(phoneInput);

	let isValidForm =
		isNameValid &&
		isDirValid &&
		isEmailValid &&
		isPhoneValid;

	if (isValidForm) {
		alert("Gracias por contactarnos!!!!");
		window.location.href = "index.html";
	}
};

const init = () => {
    renderProducts(appState.products[appState.currentProductsIndex]);
    showMoreBtn.addEventListener("click", showMoreProducts);
    categoriesContainer.addEventListener("click", applyFilter);

	cartBtn.addEventListener("click", toggleCart);
	menuBtn.addEventListener("click", toggleMenu);
	window.addEventListener("scroll", closeOnScroll);
	barsMenu.addEventListener("click", closeOnClick);
	overlay.addEventListener("click", closeOnOverlayClick);

	document.addEventListener("DOMContentLoaded", renderCart);
	document.addEventListener("DOMContentLoaded", showCartTotal);
	productsContainer.addEventListener("click", addProduct);
	productsCart.addEventListener("click", handleQuantity);
	buyBtn.addEventListener("click", completeBuy);
	deleteBtn.addEventListener("click", deleteCart);
	disableBtn(buyBtn);
	disableBtn(deleteBtn);
	renderCartBubble();

	registerForm.addEventListener("submit", submitHandler);
	nameInput.addEventListener("input", () => checkTextInput(nameInput));
	dirInput.addEventListener("input", () => checkTextInput(dirInput));
	emailInput.addEventListener("input", () => checkEmail(emailInput));
	phoneInput.addEventListener("input", () => checkPhone(phoneInput));
};

init();