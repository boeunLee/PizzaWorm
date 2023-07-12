class Worm {
  constructor() {
    this.wormBody = [new Tile(13, 10), new Tile(13, 11), new Tile(13, 12)];
    // 지렁이 현재 방향
    this.dir = "ArrowUp";
    // 지렁이 다음 방향
    this.dirNext = "ArrowUp";
  }

  renderWorm() {
    this.wormBody.forEach((item) => {
      // item = tile instance
      item.renderTile();
    });
  }

  // 지렁이의 충돌을 체크
  collisionCheck(wormHead) {
    // 가장자리에 부딪혔는지 체크
    const leftEdge = wormHead.col === 0;
    const rightEdge = wormHead.col === tileWidth - 1;
    const topEdge = wormHead.row === 0;
    const bottomEdge = wormHead.row === tileHeight - 1;

    const collisionEdge = leftEdge || rightEdge || topEdge || bottomEdge;

    // 몸과 충돌했는지 체크
    let collisionBody = false;
    this.wormBody.forEach((item) => {
      // item = 지렁이의 몸
      if (wormHead.collisionCheck(item)) {
        collisionBody = true;
      }
    });

    // 가장자리에 부딪히거나 / 지렁이의 자기 몸에 부딪혔거나  = 게임오버
    return collisionEdge || collisionBody;
  }

  // 지렁이를 움직이는 함수
  moveWorm() {
    // worm head (머리방향으로 움직이기 때문)
    // wormBody의 인덱스 첫번째
    const head = this.wormBody[0];

    // 이동에 따른 지렁이의 새로운 머리
    let newHead;

    // 다음 방향으로 지렁이를 이동
    this.dir = this.dirNext;

    // 이동 방향에 따른 머리 렌더링 위치 설정
    if (this.dir === "ArrowRight") {
      newHead = new Tile(head.col + 1, head.row);
    } else if (this.dir === "ArrowDown") {
      newHead = new Tile(head.col, head.row + 1);
    } else if (this.dir === "ArrowLeft") {
      newHead = new Tile(head.col - 1, head.row);
    } else if (this.dir === "ArrowUp") {
      newHead = new Tile(head.col, head.row - 1);
    }

    // 가장자리에 부딪히면 게임오버
    if (this.collisionCheck(newHead)) {
      renderGameOver();
    }

    // 배열 앞에 추가
    this.wormBody.unshift(newHead);

    // 피자를 먹었을 때
    if (newHead.collisionCheck(pizza.pos)) {
      // 피자의 현재 위치를 지우고
      ctxBg.clearRect(0, 0, cWidth, cHeight);
      // 피자의 다음 위치를 랜덤으로 설정
      pizza.movePizza();
    }
    // 피자를 먹지 않았을 때
    else {
      // worm tail 제거
      this.wormBody.pop();
    }
  }

  // 사용자 입력값 받기
  checkDirection(dirKey) {
    // 현재 지렁이의 방향의 역순으로 지렁이를 이동시킨다면 다음 방향으로 이동시키지 않고 return되는 예외처리
    // 즉 자기 몸에 부딪히지 않도록 설정
    if (this.dir === "ArrowRight" && dirKey === "ArrowLeft") {
      return;
    } else if (this.dir === "ArrowLeft" && dirKey === "ArrowRight") {
      return;
    } else if (this.dir === "ArrowDown" && dirKey === "ArrowUp") {
      return;
    } else if (this.dir === "ArrowUp" && dirKey === "ArrowDown") {
      return;
    }
    this.dirNext = dirKey;
  }
}
