// document.addEventListener("DOMContentLoaded", function() {

// 	// Custom JS

// });


let doper = document.querySelector('.form-upload_label'),
	 header = document.querySelector('header'),
	 galery = document.querySelector('.galery>div');
document.onwheel = e => {	 
	if (e.deltaY > 0) header.classList.add('header-scroll'); else header.classList.remove('header-scroll');
}
let startScrollPx = 0, tmpPx = 0, scrollPx = 0;
 ;
let startScrol = e =>{
	galery.style.transition = "";
	tmpPx = 0;
	startScrollPx = e.clientX;
	e.preventDefault();	
	galery.addEventListener("mousemove", galeryScrol);
} 
galery.addEventListener("mousedown", startScrol);

let galeryScrol = e =>{
	tmpPx = scrollPx + e.clientX - startScrollPx ;
	galery.style.left = tmpPx+'px';
	// 
}
document.onmouseup = e =>{
	console.log(tmpPx);
	e.preventDefault();
	galery.removeEventListener("mousemove", galeryScrol); 
	scrollPx = tmpPx;
	galery.style.transition = ".2s ease";
	if (tmpPx > 0) {
		galery.style.left = 0+'px';
		scrollPx = 0;
	}
	if (tmpPx < screen.width-2194) {
		galery.style.left = screen.width-2194+'px';
		scrollPx = screen.width-2194;
	}	
}
var canvas = document.getElementById('viewport'),
context = canvas.getContext('2d');
function make_base(url){
	base_image = new Image();
	base_image.src = url;

	base_image.onload = function(){
		let w = base_image.width,
			h = base_image.height;			
		let relation = w/h;
		if (w >= h){
			resultW = 291*relation;
			resultH = 291;
		}else {
			resultW = 430;
			resultH = 430/relation;
		}
    	context.drawImage(base_image, 0, 0, resultW, resultH);
    	console.log(w,h,base_image);
	}
}
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      // document.querySelector('#blah').src = e.target.result;
      make_base(e.target.result)
    }
    reader.readAsDataURL(input.files[0]);
  }
}
 
let loadFile = e => {
  readURL(e.target);
  doper.style.background = '#0f0';
};
document.querySelector("#form-upload").addEventListener('change', loadFile) 

doper.ondragover = e =>{
	doper.style.background = '#ff0';
	e.preventDefault();
}
doper.ondrop = e =>{
	doper.style.background = '#0f0';
	console.log(e.dataTransfer.files)
	e.preventDefault();
	document.getElementById('form-upload').files = e.dataTransfer.files;
	readURL(document.getElementById('form-upload'));
}
doper.ondragleave = e =>{
	doper.style.background = '#fff';
	console.log(e.dataTransfer.items[0].getAsFile())
	e.preventDefault();
	
}