// 主应用逻辑
document.addEventListener('DOMContentLoaded', () => {
  // DOM元素
  const clockGrid = document.querySelector('.clock-grid');
  const customizeBtn = document.getElementById('customize-btn');
  const fullscreenBtn = document.getElementById('fullscreen-btn');
  const customizeModal = document.getElementById('customize-modal');
  const closeModal = document.querySelector('.close-modal');
  const citySelector = document.querySelector('.city-selector');
  const resetCitiesBtn = document.getElementById('reset-cities');
  const saveCitiesBtn = document.getElementById('save-cities');
  
  // 获取用户选择的城市或使用默认城市
  let selectedCities = JSON.parse(localStorage.getItem('selectedCities')) || defaultCities;
  
  // 初始化时钟
  initClocks();
  
  // 初始化城市选择器
  initCitySelector();
  
  // 更新所有时钟
  function updateAllClocks() {
    document.querySelectorAll('.clock-card').forEach((clockCard, index) => {
      updateClock(clockCard, selectedCities[index]);
    });
  }
  
  // 初始化时钟
  function initClocks() {
    // 清空时钟网格
    clockGrid.innerHTML = '';
    
    // 为每个选定的城市创建时钟
    selectedCities.forEach(city => {
      const clockCard = createClockCard(city);
      clockGrid.appendChild(clockCard);
    });
    
    // 立即更新所有时钟
    updateAllClocks();
    
    // 每秒更新一次时钟
    setInterval(updateAllClocks, 1000);
  }
  
  // 创建时钟卡片
  function createClockCard(city) {
    const clockCard = document.createElement('div');
    clockCard.className = 'clock-card';
    
    // 城市信息
    const cityInfo = document.createElement('div');
    cityInfo.className = 'city-info';
    
    const flag = document.createElement('img');
    flag.className = 'flag';
    flag.src = city.flag;
    flag.alt = `${city.country} flag`;
    
    const cityText = document.createElement('div');
    
    const cityName = document.createElement('h3');
    cityName.className = 'city-name';
    cityName.textContent = city.name;
    
    const countryName = document.createElement('div');
    countryName.className = 'country-name';
    countryName.textContent = city.country;
    
    cityText.appendChild(cityName);
    cityText.appendChild(countryName);
    
    cityInfo.appendChild(flag);
    cityInfo.appendChild(cityText);
    
    // 模拟时钟
    const analogClock = document.createElement('div');
    analogClock.className = 'analog-clock';
    
    // 时钟刻度
    const clockFace = document.createElement('div');
    clockFace.className = 'clock-face';
    
    // 小时刻度
    const hourMarks = document.createElement('div');
    hourMarks.className = 'hour-marks';
    
    for (let i = 0; i < 12; i++) {
      const hourMark = document.createElement('span');
      const angle = i * 30;
      hourMark.style.transform = `rotate(${angle}deg) translateY(-90px)`;
      hourMarks.appendChild(hourMark);
    }
    
    // 分钟刻度
    const minuteMarks = document.createElement('div');
    minuteMarks.className = 'minute-marks';
    
    for (let i = 0; i < 60; i++) {
      if (i % 5 !== 0) { // 跳过小时刻度位置
        const minuteMark = document.createElement('span');
        const angle = i * 6;
        minuteMark.style.transform = `rotate(${angle}deg) translateY(-90px)`;
        minuteMarks.appendChild(minuteMark);
      }
    }
    
    clockFace.appendChild(hourMarks);
    clockFace.appendChild(minuteMarks);
    
    // 时钟指针
    const hourHand = document.createElement('div');
    hourHand.className = 'hand hour-hand';
    
    const minuteHand = document.createElement('div');
    minuteHand.className = 'hand minute-hand';
    
    const secondHand = document.createElement('div');
    secondHand.className = 'hand second-hand';
    
    analogClock.appendChild(clockFace);
    analogClock.appendChild(hourHand);
    analogClock.appendChild(minuteHand);
    analogClock.appendChild(secondHand);
    
    // 数字时间
    const digitalTime = document.createElement('div');
    digitalTime.className = 'digital-time';
    
    // 日期
    const date = document.createElement('div');
    date.className = 'date';
    
    // 组装时钟卡片
    clockCard.appendChild(cityInfo);
    clockCard.appendChild(analogClock);
    clockCard.appendChild(digitalTime);
    clockCard.appendChild(date);
    
    return clockCard;
  }
  
  // 更新时钟
  function updateClock(clockCard, city) {
    // 获取当前时间（基于城市时区）
    const now = new Date(new Date().toLocaleString('en-US', { timeZone: city.timezone }));
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    // 计算指针角度
    const hourDegrees = (hours % 12) * 30 + minutes * 0.5;
    const minuteDegrees = minutes * 6;
    const secondDegrees = seconds * 6;
    
    // 更新模拟时钟指针
    const hourHand = clockCard.querySelector('.hour-hand');
    const minuteHand = clockCard.querySelector('.minute-hand');
    const secondHand = clockCard.querySelector('.second-hand');
    
    hourHand.style.transform = `translateX(-50%) rotate(${hourDegrees}deg)`;
    minuteHand.style.transform = `translateX(-50%) rotate(${minuteDegrees}deg)`;
    secondHand.style.transform = `translateX(-50%) rotate(${secondDegrees}deg)`;
    
    // 更新数字时间
    const digitalTime = clockCard.querySelector('.digital-time');
    digitalTime.textContent = now.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    
    // 更新日期
    const date = clockCard.querySelector('.date');
    date.textContent = now.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  }
  
  // 初始化城市选择器
  function initCitySelector() {
    // 清空城市选择器
    citySelector.innerHTML = '';
    
    // 为每个可用城市创建复选框
    availableCities.forEach(city => {
      const cityCheckbox = document.createElement('label');
      cityCheckbox.className = 'city-checkbox';
      
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = city.name;
      
      // 检查城市是否已被选中
      const isSelected = selectedCities.some(selectedCity => selectedCity.name === city.name);
      checkbox.checked = isSelected;
      
      const cityLabel = document.createTextNode(`${city.name} (${city.country})`);
      
      cityCheckbox.appendChild(checkbox);
      cityCheckbox.appendChild(cityLabel);
      
      citySelector.appendChild(cityCheckbox);
    });
  }
  
  // 打开自定义城市模态框
  customizeBtn.addEventListener('click', () => {
    customizeModal.style.display = 'block';
  });
  
  // 关闭模态框
  closeModal.addEventListener('click', () => {
    customizeModal.style.display = 'none';
  });
  
  // 点击模态框外部关闭
  window.addEventListener('click', (event) => {
    if (event.target === customizeModal) {
      customizeModal.style.display = 'none';
    }
  });
  
  // 重置为默认城市
  resetCitiesBtn.addEventListener('click', () => {
    selectedCities = [...defaultCities];
    localStorage.setItem('selectedCities', JSON.stringify(selectedCities));
    initCitySelector();
    initClocks();
    customizeModal.style.display = 'none';
  });
  
  // 保存城市设置
  saveCitiesBtn.addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('.city-checkbox input:checked');
    
    // 检查是否至少选择了一个城市
    if (checkboxes.length === 0) {
      alert('请至少选择一个城市');
      return;
    }
    
    // 检查是否超过9个城市
    if (checkboxes.length > 9) {
      alert('最多只能选择9个城市');
      return;
    }
    
    // 获取选中的城市
    const newSelectedCities = Array.from(checkboxes).map(checkbox => {
      return availableCities.find(city => city.name === checkbox.value);
    });
    
    // 更新选中的城市
    selectedCities = newSelectedCities;
    
    // 保存到本地存储
    localStorage.setItem('selectedCities', JSON.stringify(selectedCities));
    
    // 重新初始化时钟
    initClocks();
    
    // 关闭模态框
    customizeModal.style.display = 'none';
  });
  
  // 全屏切换
  fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`全屏错误: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  });
});
