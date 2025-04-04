//item boxes toggle 
const cartMain = document.querySelectorAll(".icon__cartMain");
const cart = document.querySelector(".carrito");
const iconXC = document.querySelectorAll(".icon__xC");

const favMain = document.querySelectorAll(".icon__heartMain");
const fav = document.querySelector(".favoritos");
const iconXF = document.querySelectorAll(".icon__xF");

cartMain.forEach(item => {
    item.addEventListener(`click`, () => {
        cart.classList.toggle("hidden__cart");
    })
})
iconXC.forEach(item => {
    item.addEventListener(`click`, () => {
        cart.classList.toggle("hidden__cart");
    })
})

favMain.forEach(item => {
    item.addEventListener(`click`, () => {
        fav.classList.toggle("hidden__fav");
    })
})
iconXF.forEach(item => {
    item.addEventListener(`click`, () => {
        fav.classList.toggle("hidden__fav");
    })
})

//cart
const fullBodyArea = document.querySelector("body");//ecomm y header products
const cartRow = document.querySelector(".carrito__row");
let cartProducts = [];//array P
const cartTotal = document.querySelector(".carrito__total");
const countProducts = document.querySelector("#contador");

fullBodyArea.addEventListener(`click`, e => {//add to cart
    if(e.target.classList.contains("icon__cart")){
        const cProduct = e.target.parentElement;
		const cInfoProduct = {//crea array!!img?
			quantity: 1,
            imgP: cProduct.querySelector(`img`).src,//img da un link raro
			title: cProduct.querySelector(`h3`).textContent,
			price: cProduct.querySelector(`p`).textContent,
		};

        const cExist = cartProducts.some(cProduct => cProduct.title === cInfoProduct.title);
        if (cExist) {//agrega catidad
			const cProducts = cartProducts.map(cProduct => {
				if (cProduct.title === cInfoProduct.title) {
					cProduct.quantity++;
					return cProduct;
				} else {
					return cProduct;
				}
			});
			cartProducts = [...cProducts];
		} else {
			cartProducts = [...cartProducts, cInfoProduct];
		}
        cShowHTML();
    }
});

cartRow.addEventListener(`click`, e => {//borrar
	if (e.target.classList.contains("icon__delete")) {
		const cContProd = e.target.parentElement;
		const cTitle = cContProd.querySelector("h3").textContent;
		cartProducts = cartProducts.filter(cProduct => cProduct.title !== cTitle);
		cShowHTML();
	} else if (e.target.classList.contains("carrito__cantidad--mas")) {
		let cQuan = e.target.parentElement.children[1].textContent;
		cQuan = parseInt(cQuan);
		cQuan++;
		console.log(cQuan);//si lo tiene
		cShowHTML();//no lo muestra
	} else if (e.target.classList.contains("carrito__cantidad--menos")) {
		let cQuan = e.target.parentElement.children[1].textContent;
		cQuan = parseInt(cQuan);
		cQuan--;
		console.log(cQuan);//si lo tiene
		cShowHTML();//no lo muestra
		if(cQuan === 0) {
			const cContProd = e.target.parentElement.parentElement;
			cContProd.remove();
		}
	}
});

const cShowHTML = () => {//mostrar  HTML
	cartRow.innerHTML = ""; //Limpia HTML

    let cTotal = 0;
	let cTotalOfProducts = 0;

    cartProducts.forEach(cProduct => {//crea HTML
        const cContainerProduct = document.createElement(`div`);
		cContainerProduct.classList.add(`carrito__products`);

		cContainerProduct.innerHTML = `
            <div class="carrito__cantidad">
                <span class="carrito__cantidad--menos" title="Menos"><</span>
                <span class="carrito__cantidad--num">${cProduct.quantity}</span>
                <span class="carrito__cantidad--mas" title="Más">></span>
            </div>
            <img ${cProduct.imgP}>
            <h3 class="carrito__nombre">${cProduct.title}</h3>
            <p class="carrito__price">${cProduct.price}</p>
            <i class="icon__heart"><img src="img/heart.svg" alt="Icono Favoritos" title="Mover a Favoritos"></i>
            <i class="icon__delete"><img src="img/delete.svg" alt="Icono Quitar" title="Borrar"></i>
        `;
        cartRow.append(cContainerProduct);//agrega
        cTotal = cTotal + parseInt(cProduct.quantity * cProduct.price.slice(1));
		cTotalOfProducts = cTotalOfProducts + cProduct.quantity;
    });

    cartTotal.innerText = `${cTotal}`;
	countProducts.innerText = cTotalOfProducts;
}

//Fav
const favRow = document.querySelector(".favoritos__row");
let favProducts = [];//array P

fullBodyArea.addEventListener(`click`, e => {//add to fav
	if(e.target.classList.contains("icon__heart")){
		const fProduct = e.target.parentElement;
		const fInfoProduct = {//crea array!!img?
			quantity: 1,
            imgP: fProduct.querySelector(`img`).src,
			title: fProduct.querySelector(`h3`).textContent,
			price: fProduct.querySelector(`p`).textContent,
		};

		const fExist = favProducts.some(fProduct => fProduct.title === fInfoProduct.title);
        if (fExist) {//agrega catidad
			const fProduct = favProducts.map(fProduct => {
				if (fProduct.title === fInfoProduct.title) {
					fProduct.quantity++;
					return fProduct;
				} else {
					return fProduct;
				}
			});
			favProducts = [...fProduct];
		} else {
			favProducts = [...favProducts, fInfoProduct];
		}

		fShowHTML();
	};
});

favRow.addEventListener(`click`, e => {//borrar
	if (e.target.classList.contains("icon__delete")) {
		const fContProd = e.target.parentElement;
		const fTitle = fContProd.querySelector("h3").textContent;
		favProducts = favProducts.filter(fProduct => fProduct.title !== fTitle);
		fShowHTML();
	}
});

const fShowHTML = () => {
	favRow.innerHTML = ""; //Limpia HTML
	favProducts.forEach(fProduct => {//crea HTML
        const fContainerProduct = document.createElement(`div`);
		fContainerProduct.classList.add(`favoritos__products`);

		fContainerProduct.innerHTML = `
			<div class="favoritos__cantidad">
                <span class="favoritos__cantidad--menos"><</span>
                <span class="favoritos__cantidad--num">${fProduct.quantity}</span>
                <span class="favoritos__cantidad--mas">></span>
            </div>
            <img ${fProduct.imgP}>
            <h3 class="favoritos__nombre">${fProduct.title}</h3>
            <p class="favoritos__price">${fProduct.price}</p>
            <i class="icon__cart"><img src="img/shopping-cart.svg" alt="Icono Carrito" title="Comprar"></i>
            <i class="icon__delete"><img src="img/delete.svg" alt="Icono Quitar" title="Borrar"></i>
        `;
        favRow.append(fContainerProduct);//agrega
    });
};
//console.log();
//cantidad flechas
/*-----------------------------------------------------------
togle acordion gods
*/