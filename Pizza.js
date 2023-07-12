class Pizza {
  constructor() {
    this.pos = new Tile(10, 20);
  }

  // pizza img 화면에 뿌리기
  renderPizza() {
    this.pos.renderImg();
  }

  // 피자의 위치 설정
  // 피자의 위치는 가장자리가 되면 안됨
  movePizza() {
    const col = Math.floor(Math.random() * (tileWidth - 2)) + 1;
    const row = Math.floor(Math.random() * (tileHeight - 2)) + 1;
    this.pos = new Tile(col, row);
  }
}
