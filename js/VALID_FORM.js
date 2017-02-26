"use strict";

var formTag = document.forms["formForSite"];

var developersField = formTag.elements["developers"];
var nameOfSiteField = formTag.elements["nameOfSite"];
var urlField = formTag.elements["url"];
var dateField = formTag.elements["date"];
var visitField = formTag.elements["visit"];
var emailField = formTag.elements["email"];
var radioPlacementField = formTag.elements["radioPlacement"];
var checkboxField = formTag.elements["checkbox"];
var descriptionOfTheSiteField = formTag.elements["descriptionOfTheSite"];

// При попытке отправки формы — валидируем сразу все поля и 
// отображаем сразу все сообщения об ошибках
function validateForm() {

// пустой массив для того чтобы, когда будет ОШИБКА будем добавлять в массив название этого поле(где ошибка произошла). потом сфокусировать на первом поле с ошибкой (т.е. первый элемент массива)
	var arrayForQueue = [];

	try {
 
		var developersValue = developersField.value;
		var nameOfSiteValue = nameOfSiteField.value;
		var urlValue = urlField.value;		
		var dateValue = dateField.value;		
		var visitValue = visitField.value;
		var emailValue = emailField.value;
		var radioPlacementValue = radioPlacementField.value;
		var checkboxValue = checkboxField.checked;
		var descriptionOfTheSiteValue = descriptionOfTheSiteField.value;


	// ф-ция которая будет сообщать об ошибке (текст ошибки)
		function checkField(nameOfField) {
			var temporary = document.getElementById(nameOfField.name);
			temporary.innerHTML = " * Обязательно!";
			nameOfField.focus(); //фокусируем элемент и прокручиваем к нему
		}

	// функция которая проверяет условие если поля пустое сообщаем об ошибке
		function ifFieldEmpty(nameOfField) {
			if (nameOfField.value === "") {
				checkField(nameOfField);
				arrayForQueue.push(nameOfField);
			} else if (nameOfField.value !== "") {
				var temporary = document.getElementById(nameOfField.name);
				temporary.innerHTML = "";
			}
		}
	
		ifFieldEmpty(developersField);
		ifFieldEmpty(nameOfSiteField);
		ifFieldEmpty(urlField);
		ifFieldEmpty(dateField);
		ifFieldEmpty(visitField);
		ifFieldEmpty(emailField);

	// если в radio не ничего не выбрано, сообщаем об ошибке
		if (radioPlacementField.value === "") {
			var temporary = document.getElementById("radioPlacement");
			temporary.innerHTML = " * Обязательно!";
			radioPlacementField[0].focus(); //фокусируем элемент и прокручиваем к нему
			arrayForQueue.push(radioPlacementField[0]);
		} else {
			var temporary = document.getElementById("radioPlacement");
			temporary.innerHTML = "";
		}

	// если в чекбоксе не поставлено галочка сообщаем об ошибке
		if (checkboxValue === false) {
			checkField(checkboxField);
			arrayForQueue.push(checkboxField);
		} else if (checkboxValue !== false) {
			var temporary = document.getElementById(checkboxField.name);
			temporary.innerHTML = "";
		}

		ifFieldEmpty(descriptionOfTheSiteField);

	//Проверяем Наш массив очереди, если он не пустой, то фокусируем первый элемент с ошибкой и прокручиваем к нему
		if (arrayForQueue.length !== 0) {
			console.log(arrayForQueue[0]);
			arrayForQueue[0].focus();
			return false; //форма не будет отправлена на сервер
		}

		return true;
	}

	catch(Ex) {
		return false;
	}
}

// ф-ция которая будет сообщать об ошибке (текст ошибки). Для onblur
function checkEveryField(field) {
	var temporary = document.getElementById(field.name);
	temporary.innerHTML = " * Обязательно!";
}

// функция которая проверяет условие если поля пустое сообщаем об ошибке
function onblurIfFieldEmpty(nameOfField) {
	nameOfField.onblur = function() {
		if (nameOfField.value === "") {
			checkEveryField(nameOfField);

			return false; //форма не будет отправлена на сервер
		} else {
			var temporary = document.getElementById(nameOfField.name);
			temporary.innerHTML = "";
		}

		return true;
	}
}

onblurIfFieldEmpty(developersField);
onblurIfFieldEmpty(nameOfSiteField);
onblurIfFieldEmpty(urlField);
onblurIfFieldEmpty(dateField);
onblurIfFieldEmpty(visitField);
onblurIfFieldEmpty(emailField);

// если в radio ничего не выбрано, сообщаем об ошибке
radioPlacementField.forEach(function (val, ind, arr) {
	arr[ind].onchange = function () {
		if (arr[ind].value === "") {
			var temporary = document.getElementById("radioPlacement");
			temporary.innerHTML = " * Обязательно!";

			return false;
		} else {
			var temporary = document.getElementById("radioPlacement");
			temporary.innerHTML = "";
		}
	}
});

// если в чекбоксе "Разрешить отзыв" галочка не поставлена сообщаем об ошибке
checkboxField.onchange = function () {
		if (checkboxField.checked === false) {
			checkEveryField(checkboxField);

			return false; //форма не будет отправлена на сервер
		} else {
			var temporary = document.getElementById(checkboxField.name);
			temporary.innerHTML = "";
		}

		return true;
}

onblurIfFieldEmpty(descriptionOfTheSiteField);

formTag.onsubmit = validateForm;