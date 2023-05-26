
const productsData = [
	{
		id: 1,
		name: "Vainilla",
		precio: 1000,
		category: "kilo",
		icecreamImg: "./Assets/img/vainilla.jpg",
	},
	{
		id: 2,
		name: "Chocolate",
		precio: 1000,
		category: "kilo",
		icecreamImg: "./Assets/img/chocolate.jpg",
	},
	{
		id: 3,
		name: "Dulce del Leche",
		precio: 1000,
		category: "kilo",
		icecreamImg: "./Assets/img/dulcedeleche.jpg",
	},
	{
		id: 4,
		name: "Flan",
		precio: 1000,
		category: "kilo",
		icecreamImg: "./Assets/img/flan.jpg",
	},
	{
		id: 5,
		name: "Frutilla",
		precio: 1000,
		category: "kilo",
		icecreamImg: "./Assets/img/frutilla.jpg",
	},
	{
		id: 6,
		name: "Limon",
		precio: 1000,
		category: "kilo",
		icecreamImg: "./Assets/img/limon.jpg",
	},
	{
		id: 7,
		name: "Menta",
		precio: 1000,
		category: "kilo",
		icecreamImg: "./Assets/img/menta.jpg",
	},
	{
		id: 8,
		name: "Crema del Cielo",
		precio: 1000,
		category: "kilo",
		icecreamImg: "./Assets/img/cremadelcielo.jpg",
	},
    	{
		id: 9,
		name: "Palito Bombón",
		precio: 700,
		category: "palito",
		icecreamImg: "./Assets/img/palito-bombon.jpg",
	},
	{
		id: 10,
		name: "Palito Chocolate",
		precio: 700,
		category: "palito",
		icecreamImg: "./Assets/img/palito-choco.jpg",
	},
	{
		id: 11,
		name: "Palito Frutilla",
		precio: 700,
		category: "palito",
		icecreamImg: "./Assets/img/palito-frutilla.jpg",
	},
	{
		id: 12,
		name: "Palito Limón",
		precio: 700,
		category: "palito",
		icecreamImg: "./Assets/img/palito-limon.jpg",
	},
	{
		id: 13,
		name: "Palito Naranja",
		precio: 700,
		category: "palito",
		icecreamImg: "./Assets/img/palito-naranja.jpg",
	},
	{
		id: 14,
		name: "Palito Uva",
		precio: 700,
		category: "palito",
		icecreamImg: "./Assets/img/palito-uva.jpg",
	},
	{
		id: 15,
		name: "Postre Tricolor",
		precio: 3000,
		category: "especial",
		icecreamImg: "./Assets/img/postre-trico.jpg",
	},
	{
		id: 16,
		name: "Alfajor Helado",
		precio: 3000,
		category: "especial",
		icecreamImg: "./Assets/img/alfajor-helado.jpg",
	},
    	{
		id: 17,
		name: "Postre Almendrado",
		precio: 3000,
		category: "especial",
		icecreamImg: "./Assets/img/almendrado.jpg",
	},
	{
		id: 18,
		name: "Bombón Escocés",
		precio: 3000,
		category: "especial",
		icecreamImg: "./Assets/img/bombon-escoces.jpg",
	},
    {
		id: 19,
		name: "Bombón Suizo",
		precio: 3000,
		category: "especial",
		icecreamImg: "./Assets/img/bombon-suizo.jpg",
	},


];

const divideProductsInParts = (size) => {
	let productsList = [];
	for (let i = 0; i < productsData.length; i += size) {
		productsList.push(productsData.slice(i, i + size));
	}
	return productsList;
};

const appState = {
	products: divideProductsInParts(5),
	currentProductsIndex: 0,
	productsLimit: divideProductsInParts(5).length,
	activeFilter: null,
};