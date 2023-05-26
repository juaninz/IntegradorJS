const menu = document.getElementById("menu-toggle");
const navBarList = document.querySelector(".navbar-list");
const productsContainer = document.querySelector(".productos-container");
const showMoreBtn = document.querySelector(".btn-load");
const categoriesContainer = document.querySelector(".category-container");
const categoriesList = document.querySelectorAll(".category");

console.log(navBarList);

//menu hamburguesa
const mostrarMenu = () => {
    navBarList.classList.toggle("show")
};

//rendirazado
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

const init = () => {
    menu.addEventListener("click", mostrarMenu);
    renderProducts(appState.products[appState.currentProductsIndex]);
    showMoreBtn.addEventListener("click", showMoreProducts);
    categoriesContainer.addEventListener("click", applyFilter);
};

init();