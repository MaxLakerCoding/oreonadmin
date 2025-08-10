const createTasteBlock = ()=> {
  return `
    <div>
        <div class="divider"></div>

        <div class="new-taste">
            <input type="file" name="" id="">
            <div class="inputfile">
                <img src="./img/image.svg" alt="">
                <span>Натисніть щоб додати зображення</span>
            </div>
            <img src="" alt="" class="output">

            <div class="inputbox">
                <input type="text" name="tasteName" placeholder="Назва смаку">
                <input type="number" name="tasteCount" placeholder="Кількість">
                <div class="pricebox">
                    <input type="number" name="" id="" placeholder="Закупівельна">
                    <input type="number" name="" id="" placeholder="Націнка (%)">
                    <input type="number" name="" id="" placeholder="Підсумкова">
                </div>
                <textarea type="text" name="tasteFeels" id="tasteFeels" placeholder='Опишіть склад смаку через кому (наприклад: "Кавун, Диня")'></textarea>
            </div>
        </div>
    </div>
  `;
}

const addTaste = () => {
  document.querySelector('.tastes').insertAdjacentHTML('beforeend', createTasteBlock());
  const lastBlock = document.querySelector('.tastes').lastElementChild;

  // Обработка файла и превью
  const fileInput = lastBlock.querySelector('input[type="file"]');
  const outputImg = lastBlock.querySelector('.output');
  fileInput.addEventListener('change', e => {
    const file = e.target.files[0];
    if (file) {
      outputImg.src = URL.createObjectURL(file);
      outputImg.style.opacity = '1';
    } else {
      outputImg.src = '';
    }
  });

  // Работа с pricebox
  const priceBox = lastBlock.querySelector('.pricebox');
  const purchaseInput = priceBox.querySelector('input[placeholder="Закупівельна"]');
  const marginInput = priceBox.querySelector('input[placeholder="Націнка (%)"]');
  const finalInput = priceBox.querySelector('input[placeholder="Підсумкова"]');

  // Изначально отключаем margin и final
  marginInput.disabled = true;
  finalInput.disabled = true;

  // При вводе в закупочную активируем margin и final
  purchaseInput.addEventListener('input', () => {
    const purchaseVal = parseFloat(purchaseInput.value);
    if (!isNaN(purchaseVal) && purchaseVal > 0) {
      marginInput.disabled = false;
      finalInput.disabled = false;
    } else {
      marginInput.disabled = true;
      finalInput.disabled = true;
      marginInput.value = '';
      finalInput.value = '';
    }
  });

  // При вводе margin или final считаем нужное поле
  marginInput.addEventListener('input', () => {
    const purchaseVal = parseFloat(purchaseInput.value);
    const marginVal = parseFloat(marginInput.value);
    if (!isNaN(purchaseVal) && !isNaN(marginVal)) {
      const finalVal = purchaseVal * (1 + marginVal / 100);
      finalInput.value = finalVal.toFixed(2);
    } else {
      finalInput.value = '';
    }
  });

  finalInput.addEventListener('input', () => {
    const purchaseVal = parseFloat(purchaseInput.value);
    const finalVal = parseFloat(finalInput.value);
    if (!isNaN(purchaseVal) && !isNaN(finalVal) && purchaseVal !== 0) {
      const marginVal = ((finalVal / purchaseVal) - 1) * 100;
      marginInput.value = marginVal.toFixed(2);
    } else {
      marginInput.value = '';
    }
  });
};

