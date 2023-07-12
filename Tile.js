// Tile을 어디에 깔것인지
class Tile {
  // 생성자
  constructor(col, row) {
    this.col = col;
    this.row = row;

    // 바둑판의 위치
    this.posX = this.col * tileSize;
    this.posY = this.row * tileSize;
  }

  // draw tile
  renderTile(bg = "green") {
    ctx.fillStyle = bg;
    // draw Rectangle
    ctx.fillRect(this.posX, this.posY, tileSize, tileSize);
  }

  // draw img
  renderImg(bg = "./pizza.png") {
    // img 요소를 만드는 생성자 함수
    const image = new Image(tileSize, tileSize);
    image.src = bg;
    // image loading 완료되면 콜백함수 실행
    image.addEventListener("load", () => {
      // 메모리상에 있는 이미지를 화면에 뿌려주기
      ctxBg.drawImage(image, this.posX, this.posY, tileSize, tileSize);
    });
  }

  // 타일의 충돌을 체크
  // 피자를 먹거나 게임오버
  // true / false 반환
  collisionCheck(target) {
    return this.col === target.col && this.row === target.row;
  }
}
