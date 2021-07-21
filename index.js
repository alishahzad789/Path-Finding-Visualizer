  function status() {
      this.visited = false,
          this.color = "blue",
          this.value = 1
      this.non = null
      this.IsDes = null;
      this.IsSrc = null;
      this.pr = -1;
      this.pc = -1;
      this.dist = null;
  }

  function XY() {
      this.x;
      this.y;
  }
  var GR = null;
  var GC = null;
  var GDR = null;
  var GDC = null;


  var G = new Array(6);
  for (var i = 0; i < G.length; i++) {
      G[i] = new Array(6);
  }


  function INIT() {

      var n = 1;
      for (var i = 0; i < G.length; i++) {

          for (var j = 0; j < G[i].length; j++) {
              G[i][j] = new status();
              G[i][j].non = n;
              n++;
          }
      }

  }

  function UPDATECOLOR() {
      // console.log("IN UPDATE COLOR")
      for (var r = 0; r < G.length; r++) {
          for (var c = 0; c < G.length; c++) {
              //console.log(G[r][c]);
              if (G[r][c].value === 0) {
                  var cell = $('table tr').eq(r).find('td').eq(c)
                  cell.css('backgroundColor', 'red'); ///yewala
              }
          }
      }
  }

  function PUTWALL(r, c) {
      G[r][c].value = 0;
      G[r][c].color = "red";
      G[r][c].visited = true;
  }

  function AssingDes(r, c) {
      console.log(" AssingDes destination is", r, c);
      GDR = r;
      GDC = c;
      G[r][c].value = 1;
      G[r][c].color = "purple";
      G[r][c].visited = false;
      G[r][c].IsDes = true;
      var cell = $('table tr').eq(r).find('td').eq(c)
      cell.css('backgroundColor', 'PURPLE'); ///yewala
  }


  function AssingSrc(r, c) {
      console.log(" AssingSrc sources is", r, c);
      GR = r;
      GC = c;
      G[r][c].value = 1;
      G[r][c].color = "PINK";
      G[r][c].visited = false;
      G[r][c].IsSrc = true;
      var cell = $('table tr').eq(r).find('td').eq(c)
      cell.css('backgroundColor', 'PINK'); ///yewala
  }

  function INITWALLS(r, c) {
      PUTWALL(r, c);
      UPDATECOLOR();
  }

  function changeColor(sr, sc, counter, Color) {
      setTimeout(() => {
          // console.log("ROW AND COL AT INDEX ARE :", sr, "AND", sc);
          var cell = $('table tr').eq(sr).find('td').eq(sc)
          cell.css('backgroundColor', Color); ///yewala
      }, counter * 100);
  } // End changeColor

  var count = 1;

  function DFSUTIL(sr, sc, stack) {

      if (sr < 0 || sr >= G.length || sc < 0 || sc >= G[0].length) {
          // console.log("OUT OF BOUNDARY");
          return false;
      }

      if (G[sr][sc].visited === true || G[sr][sc].value === 0) //if either visited or wall then false;
      {
          // console.log("//if either visited or wall then false;");
          return false;
      }

      if (G[sr][sc].IsDes === true) { //Des node found
          stack.push({
              R: sr,
              C: sc
          });
          //console.log("DES FOUND");
          //var Colr = "purple";
          //changeColor(sr, sc, count, Colr)
          //count++;
          return true;
      }
      G[sr][sc].visited = true;
      //found = false;
      found = (DFSUTIL(sr + 1, sc, stack) || DFSUTIL(sr - 1, sc, stack) || DFSUTIL(sr, sc + 1, stack) ||
          DFSUTIL(sr, sc - 1, stack))

      if (found === true) {
          // console.log("RECURSIVE BOOL DES FOUND");
          //var Colr = "green";
          //changeColor(sr, sc, count, Colr)
          //count++;
          stack.push({
              R: sr,
              C: sc
          });
      }
      return found;
  }

  function COLORPATH(stack, cnt) {
      var color = "yellow";
      //var run=0;
      console.log("Length of stack is:", stack.length);
      for (var g = stack.length - 1; g >= 0; g--) {
          var sr = stack[g].R;
          var sc = stack[g].C;
          if (g == 0) {
              var color = "orange";
              changeColor(sr, sc, cnt, color)
          } else {
              changeColor(sr, sc, cnt, color)

          }
          cnt += 1;
          // run++;
      }
  }

  function DFS() {
      //Time Complexity: O(N * M)
      var sr = GR;
      var sc = GC;
      var stack = [];
      console.log("BEFORE DFS ", stack, " ", sr, " ", sc);
      DFSUTIL(sr, sc, stack);
      console.log("AFTER DFS ", stack);
      var c = 1;
      //ColorPathDelay(stack);
      COLORPATH(stack, c);
  }

  function RESET() {
      console.log("RESET");
      GR = null;
      GC = null;
      GDR = null;
      GDC = null;
      var n = 1;
      for (var i = 0; i < G.length; i++) {

          for (var j = 0; j < G[i].length; j++) {
              G[i][j] = new status();
              G[i][j].non = n;
              G[i][j].visited = false;
              G[i][j].IsDes = false;
              G[i][j].IsSrc = false;
              G[i][j].pr = -1;
              G[i][j].pc = -1;
              var cell = $('table tr').eq(i).find('td').eq(j)
              cell.css('backgroundColor', 'rgb(134, 203, 248)'); ///yewala
              n++;
          }
      }
      console.log(G);
  }

  function Isvalid(r, c) {
      if (r < 0 || r >= G.length || c < 0 || c >= G[0].length) {
          return false;
      }
      if (G[r][c].value == 0) {
          return false;
      }
      if (G[r][c].visited == true) {
          return false;
      }
      return true;
  }



  function BFSUTIL(sr, sc, queue, path) {
      queue.push({
          R: sr,
          C: sc
      });
      G[sr][sc].visited = true;
      G[sr][sc].dist = 0;
      console.log("IN BFS UTILE");

      while (queue.length > 0) {
          CurrentNode = queue.shift();
          console.log("IN BFS UTILE LOOP");

          if (G[CurrentNode.R][CurrentNode.C].IsDes == true) {

            var cell = $('table tr').eq(CurrentNode.R).find('td').eq(CurrentNode.C)
            cell.css('backgroundColor', 'orange'); ///yewala
              var tr = CurrentNode.R;
              var tc = CurrentNode.C;
              var DIST = G[CurrentNode.R][CurrentNode.C].dist;
              while (G[tr][tc].IsSrc == false) {
                  if (tr > 0 && G[tr - 1][tc].dist == DIST - 1) {
                      path.push({
                          R: tr - 1,
                          C: tc
                      });
                      tr--;
                  }
                  if (tr < G.length - 1 && G[tr + 1][tc].dist == DIST - 1) {
                      path.push({
                          R: tr + 1,
                          C: tc
                      });
                      tr++;
                  }
                  if (tc > 0 && G[tr][tc - 1].dist == DIST - 1) {
                      path.push({
                          R: tr,
                          C: tc - 1
                      });
                      tc--;
                  }
                  if (tc < G[0].length - 1 && G[tr][tc + 1].dist == DIST - 1) {
                      path.push({
                          R: tr,
                          C: tc + 1
                      });
                      tc++;
                  }
                  DIST--;
              }
            
              return true;
          }
          if (Isvalid(CurrentNode.R + 1, CurrentNode.C) == true) {
              G[CurrentNode.R + 1][CurrentNode.C].pr = CurrentNode.R;
              G[CurrentNode.R + 1][CurrentNode.C].pc = CurrentNode.C;
              G[CurrentNode.R + 1][CurrentNode.C].visited = true;
              G[CurrentNode.R + 1][CurrentNode.C].dist = G[CurrentNode.R][CurrentNode.C].dist + 1;
              var tr = CurrentNode.R + 1;
              var tc = CurrentNode.C;
              queue.push({
                  R: CurrentNode.R + 1,
                  C: CurrentNode.C
              });
          }
          if (Isvalid(CurrentNode.R - 1, CurrentNode.C) == true) {
              G[CurrentNode.R - 1][CurrentNode.C].pr = CurrentNode.R;
              G[CurrentNode.R - 1][CurrentNode.C].pc = CurrentNode.C;
              G[CurrentNode.R - 1][CurrentNode.C].visited = true;
              G[CurrentNode.R - 1][CurrentNode.C].dist = G[CurrentNode.R][CurrentNode.C].dist + 1;

              var tr = CurrentNode.R - 1;
              var tc = CurrentNode.C;
              queue.push({
                  R: CurrentNode.R - 1,
                  C: CurrentNode.C
              });
          }
          if (Isvalid(CurrentNode.R, CurrentNode.C + 1) == true) {
              G[CurrentNode.R][CurrentNode.C + 1].pr = CurrentNode.R;
              G[CurrentNode.R][CurrentNode.C + 1].pc = CurrentNode.C;
              G[CurrentNode.R][CurrentNode.C + 1].visited = true;
              G[CurrentNode.R][CurrentNode.C + 1].dist = G[CurrentNode.R][CurrentNode.C].dist + 1;

              var tr = CurrentNode.R;
              var tc = CurrentNode.C + 1;
              queue.push({
                  R: CurrentNode.R,
                  C: CurrentNode.C + 1
              });
          }
          if (Isvalid(CurrentNode.R, CurrentNode.C - 1) == true) {
              G[CurrentNode.R][CurrentNode.C - 1].pr = CurrentNode.R;
              G[CurrentNode.R][CurrentNode.C - 1].pc = CurrentNode.C;
              G[CurrentNode.R][CurrentNode.C - 1].visited = true;
              G[CurrentNode.R][CurrentNode.C - 1].dist = G[CurrentNode.R][CurrentNode.C].dist + 1;
              var tr = CurrentNode.R;
              var tc = CurrentNode.C - 1;
              queue.push({
                  R: CurrentNode.R,
                  C: CurrentNode.C - 1
              });
          }
      }
      return false;
  }

  function BACKTRACTBFSPRINT(PATH) {
      for (var i = PATH.length - 1; i >= 0; i--) {
          var r = PATH[i].R;
          var c = PATH[i].C;
          var cell = $('table tr').eq(r).find('td').eq(c)
          cell.css('backgroundColor', 'green'); ///yewala
      }
  }

  function BFS() {

      var queue = []
      var sr = GR;
      var sc = GC;
      var dr = GDR;
      var dc = GDC;
      var PATH = []
      console.log("BFS SOURCE IS ", sr, sc);
      console.log("BFS DESTI IS ", dr, dc);
      BFSUTIL(sr, sc, queue, PATH);
      console.log(PATH);
      BACKTRACTBFSPRINT(PATH);
  }
  $('.btn').click(function () {
      var b = $(this);
      console.log("HERE LOOP", b);
      $(this).toggleClass('active').siblings().removeClass("active");
      // b = $(this);
      // console.log("HERE LOOP", b);

  });

  document.getElementsByTagName("Table")[0].addEventListener('click', (event) => {
      const table = document.querySelector('table');
      const rows = document.querySelectorAll('tr');
      const rowsArray = Array.from(rows);
      var btns = document.getElementsByClassName('btn');
      var actiontype = null;
      for (var i = 0; i < btns.length; i++) {
          if (btns[i].classList.contains("active")) {
              actiontype = btns[i].id;
          }
      }
      const rowIndex = rowsArray.findIndex(row => row.contains(event.target));
      const columns = Array.from(rowsArray[rowIndex].querySelectorAll('td'));
      const columnIndex = columns.findIndex(column => column == event.target);
      var r = rowIndex;
      var c = columnIndex;
      //console.log(r, c)
      if (actiontype == "PUTSOURCE") {
          console.log("ASSIGN SRC CALLED");
          AssingSrc(r, c);
      }
      if (actiontype == "PUTDESTINATION") {
          console.log("ASSIGN DES CALLED");
          AssingDes(r, c);
      }
      if (actiontype == "PUTWALL") {
          console.log("ASSIGN WALLS CALLED");
          INITWALLS(r, c);
      }
  })
  //INIT();
  document.getElementById("CLEARBTN").addEventListener("click", RESET);
  document.getElementById("DFSID").addEventListener("click", DFS);
  document.getElementById("BFSID").addEventListener("click", BFS);