const yeniGorev=document.querySelector('.input-gorev');
const yeniGorevEkleBtn=document.querySelector('.btn-gorev-ekle');
const gorevListesi=document.querySelector('.gorev-listesi');

yeniGorevEkleBtn.addEventListener('click',gorevEkle);
gorevListesi.addEventListener('click',gorevSilTamamla);
document.addEventListener('DOMContentLoaded',localStoragedenOku);

function gorevSilTamamla(e){
   const tiklanilanEleman=e.target;
   if (tiklanilanEleman.classList.contains('gorev-btn-tamamlandi')) {
       //toogle fonksiyonu varsa siler yoksa ekler
       tiklanilanEleman.parentElement.classList.toggle('gorev-tamamlandi');
   }
    if (tiklanilanEleman.classList.contains('gorev-btn-sil')) {
       if (confirm('Silmek İstediğinizden Eminmisiniz')) {
        tiklanilanEleman.parentElement.classList.toggle('kaybol');
        const silinicekEleman=tiklanilanEleman.parentElement.children[0].innerText;
        console.log(silinicekEleman);
        localStoragedenSil(silinicekEleman);
        //işlem bittikten sonra (transitionend)
        tiklanilanEleman.parentElement.addEventListener('transitionend',function(){
            tiklanilanEleman.parentElement.remove();
            
        })
       }
        
   }
  
}

function gorevEkle(e)
{
    if (yeniGorev.value.length>0) {
        e.preventDefault();
    gorevItemOlustur(yeniGorev.value);
    //LocalStorage kaydetme
    localStorageKaydet(yeniGorev.value);
    //Tex in içini boşalt
    yeniGorev.value='';
    }
    else
    {
        alert('Boş Karakter Girmeyiniz...');
    }
    
   
    
}
function localStorageKaydet(yeniGorev){
    let gorevler;
    if (localStorage.getItem('gorevler')===null) {
        gorevler=[];
    }
    else 
    {
        gorevler=JSON.parse(localStorage.getItem('gorevler'));
    }
    gorevler.push(yeniGorev);
    localStorage.setItem('gorevler',JSON.stringify(gorevler));
}

function localStoragedenOku(){
   let gorevler;
   if (localStorage.getItem('gorevler')===null) {
       gorevler=[];
   }
   else
   {
    gorevler=JSON.parse(localStorage.getItem('gorevler'));
   }
   gorevler.forEach(element => {
       console.log(element);
       gorevItemOlustur(element);
       
   });
    
}

function gorevItemOlustur(ListeMesajıAlınanYer)
{
     //Div Oluşturma
     const gorevDiv=document.createElement('div');
     gorevDiv.classList.add('gorev-item');
     //Li oluşturma 
     const gorevLi=document.createElement('li');
     gorevLi.classList.add('gorev-tanim');
     //Li ye yazılan text i atama
     gorevLi.innerText=ListeMesajıAlınanYer;
     //Li yi Div in içine atama
     gorevDiv.appendChild(gorevLi);
     //Tamamlandı butonu ekleme ve Div e ekleme
     const gorevTamambtn=document.createElement('button');
     gorevTamambtn.classList.add('gorev-btn');
     gorevTamambtn.classList.add('gorev-btn-tamamlandi');
     gorevTamambtn.innerHTML='<i class="fa-solid fa-circle-check">';
     gorevDiv.appendChild(gorevTamambtn);
     //Sil butonu Ekleme ve Div e ekleme
     const gorevSilBtn=document.createElement('button');
     gorevSilBtn.classList.add('gorev-btn');
     gorevSilBtn.classList.add('gorev-btn-sil');
     gorevSilBtn.innerHTML='<i class="fa-solid fa-trash-alt"></i>';
     gorevDiv.appendChild(gorevSilBtn);
     //Div i Ul nin içine atama
     gorevListesi.appendChild(gorevDiv);
}
function localStoragedenSil(ListedeSilinecekMesajınYeri){
    let gorevler;
    if (localStorage.getItem('gorevler')!==null) {
        gorevler=[];
    }
    else
    {
        gorevler=JSON.parse(localStorage.getItem('gorevler'));
    }
    
    //splice ile silme
    const silinicekElemanIndex=gorevler.indexOf(ListedeSilinecekMesajınYeri);
    gorevler.splice(silinicekElemanIndex,1);
    
    localStorage.setItem('gorevler',JSON.stringify(gorevler));
    

}