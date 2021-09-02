(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Elion\Desktop\NRA\src\main.ts */"zUnb");


/***/ }),

/***/ "3N5j":
/*!******************************!*\
  !*** ./src/app/globalVar.ts ***!
  \******************************/
/*! exports provided: State */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "State", function() { return State; });
class State {
}
State.inProgress = false;
State.type = '';
State.points = [];
State.fightR = false;


/***/ }),

/***/ "5Lta":
/*!********************************************!*\
  !*** ./src/app/topbar/topbar.component.ts ***!
  \********************************************/
/*! exports provided: TopbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TopbarComponent", function() { return TopbarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _globalVar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../globalVar */ "3N5j");
/* harmony import */ var _grid_builder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../grid/builder */ "nvla");
/* harmony import */ var _services_mazes_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/mazes.service */ "xVYf");
/* harmony import */ var _services_pathfind_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/pathfind.service */ "ungK");
/* harmony import */ var _services_top_k_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/top-k.service */ "NJtI");
/* harmony import */ var _services_observers_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/observers.service */ "6ONb");








class TopbarComponent {
    constructor(share) {
        this.share = share;
        this.options = [true, false, false, false, false];
        this.algos = [
            'Visualize Astar',
            'Visualize BFS',
            'Visualize DFS',
            'Visualize UCS',
            'Visualize NRA',
            'Fight the Algorithm',
        ];
        this.index = 0;
        this.observers = [];
        this.grid = [];
        this.builder = new _grid_builder__WEBPACK_IMPORTED_MODULE_2__["Builder"]();
        this.opt = 0;
        this.pathFind = 'Visualize';
    }
    ngOnInit() {
        this.share.changeOpt(2);
        this.observers.push(this.share.prstart.subscribe(() => {
            this.start();
        }), this.share.grid.subscribe((g) => {
            this.grid = g;
            this.mazeService = new _services_mazes_service__WEBPACK_IMPORTED_MODULE_3__["MazesService"](this.grid);
            this.pathService = new _services_pathfind_service__WEBPACK_IMPORTED_MODULE_4__["PathfindService"](this.grid);
            this.topkService = new _services_top_k_service__WEBPACK_IMPORTED_MODULE_5__["TopKService"](this.grid);
        }));
    }
    ngOnDestroy() {
        this.observers.forEach((observer) => {
            observer.unsubscribe();
        });
    }
    walls() {
        this.options[this.index] = false;
        this.options[1] = true;
        this.index = 1;
        this.share.changeOpt(0);
    }
    clear(opt) {
        var _a, _b, _c, _d;
        this.options[this.index] = false;
        this.options[2] = true;
        this.index = 2;
        if (opt == 1) {
            (_a = this.mazeService) === null || _a === void 0 ? void 0 : _a.clear();
        }
        else if (opt == 2) {
            (_b = this.mazeService) === null || _b === void 0 ? void 0 : _b.clearPathAndPoints();
        }
        else if (opt == 3) {
            (_c = this.mazeService) === null || _c === void 0 ? void 0 : _c.clearPath();
        }
        else if (opt == 4) {
            (_d = this.mazeService) === null || _d === void 0 ? void 0 : _d.clearWalls();
        }
        if (_globalVar__WEBPACK_IMPORTED_MODULE_1__["State"].type == 'f') {
            this.fight();
        }
    }
    start() {
        this.options[this.index] = false;
        this.options[0] = true;
        this.index = 0;
        this.share.changeOpt(2);
    }
    visualize() {
        var _a, _b, _c;
        if (_globalVar__WEBPACK_IMPORTED_MODULE_1__["State"].inProgress || _globalVar__WEBPACK_IMPORTED_MODULE_1__["State"].fightR) {
            return;
        }
        if (_globalVar__WEBPACK_IMPORTED_MODULE_1__["State"].type == '') {
            confirm('choose algorithm');
            return;
        }
        if (_globalVar__WEBPACK_IMPORTED_MODULE_1__["State"].type == 'f') {
            this.share.initAlgo();
            return;
        }
        this.options[this.index] = false;
        this.options[3] = true;
        this.index = 3;
        //check if points were choosen properly
        if (_globalVar__WEBPACK_IMPORTED_MODULE_1__["State"].points.length < 2) {
            if (_globalVar__WEBPACK_IMPORTED_MODULE_1__["State"].type == 'sp') {
                confirm('select two points!!');
            }
            else {
                confirm('select two or more points!!');
            }
            this.start();
            return;
        }
        let ids = [];
        _globalVar__WEBPACK_IMPORTED_MODULE_1__["State"].points.forEach((s) => {
            let id = this.grid[s[0]][s[1]].id;
            ids.push(id);
        });
        (_a = this.mazeService) === null || _a === void 0 ? void 0 : _a.clearPath();
        //construct the graph and choose algorithm
        let graph = this.builder.buildgraph(this.grid);
        if (_globalVar__WEBPACK_IMPORTED_MODULE_1__["State"].type == 'sp') {
            (_b = this.pathService) === null || _b === void 0 ? void 0 : _b.chooseAlgo(this.opt, graph, ids[0], ids[1]);
        }
        else {
            (_c = this.topkService) === null || _c === void 0 ? void 0 : _c.chooseAlgo(this.opt, graph, ids);
        }
    }
    mazes(opt) {
        var _a;
        (_a = this.mazeService) === null || _a === void 0 ? void 0 : _a.mazePicker(opt);
    }
    pathFinding(opt) {
        var _a, _b, _c;
        if (_globalVar__WEBPACK_IMPORTED_MODULE_1__["State"].type != 'sp') {
            (_a = this.mazeService) === null || _a === void 0 ? void 0 : _a.clearPath();
        }
        if (_globalVar__WEBPACK_IMPORTED_MODULE_1__["State"].points.length > 2) {
            _globalVar__WEBPACK_IMPORTED_MODULE_1__["State"].points = [];
            (_b = this.mazeService) === null || _b === void 0 ? void 0 : _b.clearPathAndPoints();
        }
        if (_globalVar__WEBPACK_IMPORTED_MODULE_1__["State"].type == 'f') {
            (_c = this.mazeService) === null || _c === void 0 ? void 0 : _c.clear();
        }
        this.opt = opt;
        this.pathFind = this.algos[opt - 1];
        _globalVar__WEBPACK_IMPORTED_MODULE_1__["State"].type = 'sp';
        this.share.changeOpt(2);
    }
    topKq(o) {
        var _a, _b;
        if (_globalVar__WEBPACK_IMPORTED_MODULE_1__["State"].type != 'pf') {
            (_a = this.mazeService) === null || _a === void 0 ? void 0 : _a.clearPath();
        }
        if (_globalVar__WEBPACK_IMPORTED_MODULE_1__["State"].type == 'f') {
            (_b = this.mazeService) === null || _b === void 0 ? void 0 : _b.clear();
        }
        this.opt = o;
        this.pathFind = this.algos[o - 1];
        _globalVar__WEBPACK_IMPORTED_MODULE_1__["State"].type = 'pf';
        this.share.changeOpt(2);
    }
    fight() {
        var _a;
        this.pathFind = this.algos[5];
        _globalVar__WEBPACK_IMPORTED_MODULE_1__["State"].type = 'f';
        _globalVar__WEBPACK_IMPORTED_MODULE_1__["State"].points = [];
        (_a = this.mazeService) === null || _a === void 0 ? void 0 : _a.clear();
        this.share.changeOpt(10);
    }
}
TopbarComponent.ɵfac = function TopbarComponent_Factory(t) { return new (t || TopbarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_observers_service__WEBPACK_IMPORTED_MODULE_6__["ObserversService"])); };
TopbarComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: TopbarComponent, selectors: [["app-topbar"]], decls: 112, vars: 9, consts: [[1, "navbar"], [1, "welcome"], [1, "options"], [3, "click"], [1, "mazes"], [1, "dropdown"], [1, "dropdown", "pos"], ["data-toggle", "modal", "onclick", "firstSlide()", "data-target", "#exampleModalCenter"], ["id", "exampleModalCenter", "tabindex", "-1", "role", "dialog", "aria-labelledby", "exampleModalCenterTitle", "aria-hidden", "true", 1, "modal", "fade"], ["role", "document", 1, "modal-dialog", "modal-dialog-centered"], [1, "modal-content"], [1, "modal-body", 2, "max-height", "350px"], [1, "w3-content", "w3-display-container"], [1, "wrapper"], ["onclick", "plusDivs(-1)", 1, "btn", "btn-primary"], [1, "w3-display-container", "mySlides"], [1, "content"], ["src", "assets/walls.gif", 1, "preview"], [1, "h"], ["src", "assets/mazes.gif", 1, "preview"], ["src", "assets/astar.gif", 1, "preview"], ["src", "assets/nra.gif", 1, "preview"], ["src", "assets/fight.gif", 1, "preview"], ["onclick", "plusDivs(1)", 1, "btn", "btn-primary"]], template: function TopbarComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "PathFinding Visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TopbarComponent_Template_div_click_5_listener() { return ctx.start(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Set Points");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TopbarComponent_Template_div_click_7_listener() { return ctx.walls(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Draw Walls");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, " Mazes ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TopbarComponent_Template_div_click_12_listener() { return ctx.mazes(1); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Recursive Division");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TopbarComponent_Template_div_click_14_listener() { return ctx.mazes(2); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Recursive Backtracker");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TopbarComponent_Template_div_click_16_listener() { return ctx.mazes(3); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "Random Kruskal");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TopbarComponent_Template_div_click_18_listener() { return ctx.mazes(4); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "Random Prim");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TopbarComponent_Template_div_click_20_listener() { return ctx.mazes(5); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "Aldous-Broder");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, " Algorithms ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TopbarComponent_Template_div_click_25_listener() { return ctx.pathFinding(1); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, "Astar");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TopbarComponent_Template_div_click_27_listener() { return ctx.pathFinding(2); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, "Breadth First Search");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TopbarComponent_Template_div_click_29_listener() { return ctx.pathFinding(3); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, "Depth First Search");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TopbarComponent_Template_div_click_31_listener() { return ctx.pathFinding(4); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32, "Uniform Cost Search");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TopbarComponent_Template_div_click_33_listener() { return ctx.topKq(5); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](34, "Optimal Meeting Point");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TopbarComponent_Template_div_click_35_listener() { return ctx.fight(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](36, "Fight the algorithm!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, " Clear ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TopbarComponent_Template_div_click_40_listener() { return ctx.clear(1); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](41, "Clear Board");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TopbarComponent_Template_div_click_42_listener() { return ctx.clear(3); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](43, "Clear Path");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TopbarComponent_Template_div_click_44_listener() { return ctx.clear(4); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](45, "Clear Walls");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TopbarComponent_Template_div_click_46_listener() { return ctx.clear(2); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](47, "Clear Paths and Points");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TopbarComponent_Template_div_click_48_listener() { return ctx.visualize(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](49);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](51, " Guide ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "button", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](59, " \u276E ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](61, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](63, "Drawing Walls");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](65, " You can draw walls by selecting the option on the navbar and then clicking and hovering on the grid. Click again to stop drawing. A wall can not go over any other special point. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](66, "img", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](67, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](69, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](70, "Welcome!!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](71, "p", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](72, " Welcome to the Path Finding Visualizer!. In this project you can see in action various algorithms for path finding and perfect maze generation!. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](73, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](74, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](75, " For the visualization a 2D grid graph was used and each movement can have a vertical or a horizontal direction. Moreover a node can have up to 4 neighbors, and the cost of each edge is 1. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](76, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](77, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](78, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](79, "Maze Generation");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](80, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](81, " You can generate mazes by selecting an algorithm from the Mazes dropdown menu. Note that you can't generate mazes when the Fight the algorithm option is selected. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](82, "img", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](83, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](84, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](85, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](86, "PathFinding Algorithms");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](87, "p", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](88, " A*: A modified version of dijkstra's algorithm that chooses the best node to visit based on an heuristic function. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](89, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](90, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](91, "BFS/DFS: BFS starts exploring all nodes from the closest to the furthest away nodes and guarantees the shortest path. DFS on the other hand starts from the furthest away nodes and does not guarantee the shortest path. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](92, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](93, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](94, "Uniform Cost Search: The algorithm starts with a priority queue that contains only one item, and inserts new items as they are discovered. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](95, "img", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](96, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](97, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](98, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](99, "Best Meeting Point");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](100, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](101, " For this problem a combination of Non Random Access algorithm and an incremental version of Dijkstra's algorithhm was used. NRA is an algorithm used for topK queries and in this case we will be doing a top1 query. Each time the algorithm gets the next closest node from every starting node and checks if every starting node has reached one of those next closest nodes, updating the minimum distance as well as the maximum. If a node has been visited by all the starting nodes it is compared with the previous meeting point based on the maximum distance. The result is a node that has the minimum maximum distance. Due to the nature of NRA the worst case is O(k(V + ElogV)). However if the starting nodes are close the algorithm will terminate very fast. Up to ten points can be selected and you can also add walls or mazes to see the algorithm in action. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](102, "img", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](103, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](104, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](105, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](106, "Fight the algorithm!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](107, "p", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](108, " For this problem Astar was used. Since the process is a separate thread it is possible to draw walls while the algorithm is running and redirect it to find the next closest path.You can drag and drop the end point to a different location or just click on the grid to move it around. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](109, "img", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](110, "button", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](111, " \u276F ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("marked", ctx.options[0]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("marked", ctx.options[1]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("marked", ctx.options[2]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("marked", ctx.options[3]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.pathFind, " ");
    } }, styles: [".navbar[_ngcontent-%COMP%] {\r\n    background-color: #022335;\r\n    position: fixed;\r\n    top: 0;\r\n    width: 100%;\r\n    display: flex;\r\n    flex-direction: row;\r\n    justify-content: space-between;\r\n    z-index: 10;\r\n}\r\n\r\n.options[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    flex-direction: row;\r\n    gap: 5px;\r\n}\r\n\r\n.welcome[_ngcontent-%COMP%] > h1[_ngcontent-%COMP%] {\r\n    color: rgb(245, 245, 245);\r\n    margin: 0px !important;\r\n    font-size: 24px;\r\n}\r\n\r\n.options[_ngcontent-%COMP%] > div[_ngcontent-%COMP%] {\r\n    color: rgb(245, 245, 245);\r\n    cursor: pointer;\r\n    padding: 5px;\r\n    border-radius: 5px;\r\n    transition: all 0.4s ease-out;\r\n}\r\n\r\n.options[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:hover {\r\n    background: #075884;\r\n}\r\n\r\n.marked[_ngcontent-%COMP%] {\r\n    background: #075884;\r\n}\r\n\r\n.mazes[_ngcontent-%COMP%] {\r\n    position: relative;\r\n    z-index: 20;\r\n}\r\n\r\n.mazes[_ngcontent-%COMP%]:hover > div[_ngcontent-%COMP%] {\r\n    opacity: 1 !important;\r\n    pointer-events: auto !important;\r\n}\r\n\r\n.dropdown[_ngcontent-%COMP%] {\r\n    position: absolute;\r\n    z-index: 30;\r\n    top: 34px;\r\n    right: -70px;\r\n    color: rgb(245, 245, 245);\r\n    background-color: #022335;\r\n    flex-direction: column;\r\n    width: 189px;\r\n    align-items: flex-start;\r\n    padding: 5px;\r\n    border-radius: 4px;\r\n    opacity: 0;\r\n    transition: all 0.3s ease-out;\r\n    pointer-events: none;\r\n}\r\n\r\n.dropdown[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:hover {\r\n    background: #075884;\r\n}\r\n\r\n.dropdown[_ngcontent-%COMP%] > div[_ngcontent-%COMP%] {\r\n    border-radius: 5px;\r\n    width: 100%;\r\n    padding: 3px;\r\n    transition: all 0.3s ease-out;\r\n}\r\n\r\n.content[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    margin: 0 10px 0px 10px;\r\n    max-height: 320px !important;\r\n    overflow-y: scroll !important;\r\n    color: #022335;\r\n}\r\n\r\n.content[_ngcontent-%COMP%] > h1[_ngcontent-%COMP%] {\r\n    font-size: 28px;\r\n    border-bottom: 1px solid #96a8b2;\r\n    padding-bottom: 10px;\r\n    margin-bottom: 15px;\r\n}\r\n\r\n.preview[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    height: 200px;\r\n}\r\n\r\n.h[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n}\r\n\r\n.pos[_ngcontent-%COMP%] {\r\n    right: -53px !important;\r\n}\r\n\r\n.wrapper[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    flex-direction: row;\r\n    align-items: center;\r\n}\r\n\r\n@media only screen and (max-width: 800px) {\r\n    .options[_ngcontent-%COMP%] {\r\n        font-size: 13px;\r\n    }\r\n    .dropdown[_ngcontent-%COMP%] {\r\n        top: 28px;\r\n    }\r\n}\r\n\r\n@media only screen and (max-width: 500px) {\r\n    .options[_ngcontent-%COMP%] {\r\n        font-size: 8px;\r\n    }\r\n    .dropdown[_ngcontent-%COMP%] {\r\n        top: 21px;\r\n    }\r\n}\r\n\r\n@media only screen and (max-width: 400px) {\r\n    .options[_ngcontent-%COMP%] {\r\n        font-size: 6px;\r\n    }\r\n    .dropdown[_ngcontent-%COMP%] {\r\n        top: 15px;\r\n    }\r\n}\r\n\r\n.mySlides[_ngcontent-%COMP%] {\r\n    display: none;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvcGJhci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0kseUJBQXlCO0lBQ3pCLGVBQWU7SUFDZixNQUFNO0lBQ04sV0FBVztJQUNYLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsOEJBQThCO0lBQzlCLFdBQVc7QUFDZjs7QUFFQTtJQUNJLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsUUFBUTtBQUNaOztBQUVBO0lBQ0kseUJBQXlCO0lBQ3pCLHNCQUFzQjtJQUN0QixlQUFlO0FBQ25COztBQUVBO0lBQ0kseUJBQXlCO0lBQ3pCLGVBQWU7SUFDZixZQUFZO0lBQ1osa0JBQWtCO0lBQ2xCLDZCQUE2QjtBQUNqQzs7QUFFQTtJQUNJLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixXQUFXO0FBQ2Y7O0FBRUE7SUFDSSxxQkFBcUI7SUFDckIsK0JBQStCO0FBQ25DOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLFdBQVc7SUFDWCxTQUFTO0lBQ1QsWUFBWTtJQUNaLHlCQUF5QjtJQUN6Qix5QkFBeUI7SUFDekIsc0JBQXNCO0lBQ3RCLFlBQVk7SUFDWix1QkFBdUI7SUFDdkIsWUFBWTtJQUNaLGtCQUFrQjtJQUNsQixVQUFVO0lBQ1YsNkJBQTZCO0lBQzdCLG9CQUFvQjtBQUN4Qjs7QUFFQTtJQUNJLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixXQUFXO0lBQ1gsWUFBWTtJQUNaLDZCQUE2QjtBQUNqQzs7QUFFQTtJQUNJLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsbUJBQW1CO0lBQ25CLHVCQUF1QjtJQUN2Qiw0QkFBNEI7SUFDNUIsNkJBQTZCO0lBQzdCLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsZ0NBQWdDO0lBQ2hDLG9CQUFvQjtJQUNwQixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsYUFBYTtBQUNqQjs7QUFFQTtJQUNJLFdBQVc7QUFDZjs7QUFFQTtJQUNJLHVCQUF1QjtBQUMzQjs7QUFFQTtJQUNJLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0k7UUFDSSxlQUFlO0lBQ25CO0lBQ0E7UUFDSSxTQUFTO0lBQ2I7QUFDSjs7QUFFQTtJQUNJO1FBQ0ksY0FBYztJQUNsQjtJQUNBO1FBQ0ksU0FBUztJQUNiO0FBQ0o7O0FBRUE7SUFDSTtRQUNJLGNBQWM7SUFDbEI7SUFDQTtRQUNJLFNBQVM7SUFDYjtBQUNKOztBQUVBO0lBQ0ksYUFBYTtBQUNqQiIsImZpbGUiOiJ0b3BiYXIuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5uYXZiYXIge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAyMjMzNTtcclxuICAgIHBvc2l0aW9uOiBmaXhlZDtcclxuICAgIHRvcDogMDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICB6LWluZGV4OiAxMDtcclxufVxyXG5cclxuLm9wdGlvbnMge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAgICBnYXA6IDVweDtcclxufVxyXG5cclxuLndlbGNvbWU+aDEge1xyXG4gICAgY29sb3I6IHJnYigyNDUsIDI0NSwgMjQ1KTtcclxuICAgIG1hcmdpbjogMHB4ICFpbXBvcnRhbnQ7XHJcbiAgICBmb250LXNpemU6IDI0cHg7XHJcbn1cclxuXHJcbi5vcHRpb25zPmRpdiB7XHJcbiAgICBjb2xvcjogcmdiKDI0NSwgMjQ1LCAyNDUpO1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgcGFkZGluZzogNXB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgdHJhbnNpdGlvbjogYWxsIDAuNHMgZWFzZS1vdXQ7XHJcbn1cclxuXHJcbi5vcHRpb25zPmRpdjpob3ZlciB7XHJcbiAgICBiYWNrZ3JvdW5kOiAjMDc1ODg0O1xyXG59XHJcblxyXG4ubWFya2VkIHtcclxuICAgIGJhY2tncm91bmQ6ICMwNzU4ODQ7XHJcbn1cclxuXHJcbi5tYXplcyB7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICB6LWluZGV4OiAyMDtcclxufVxyXG5cclxuLm1hemVzOmhvdmVyPmRpdiB7XHJcbiAgICBvcGFjaXR5OiAxICFpbXBvcnRhbnQ7XHJcbiAgICBwb2ludGVyLWV2ZW50czogYXV0byAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4uZHJvcGRvd24ge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgei1pbmRleDogMzA7XHJcbiAgICB0b3A6IDM0cHg7XHJcbiAgICByaWdodDogLTcwcHg7XHJcbiAgICBjb2xvcjogcmdiKDI0NSwgMjQ1LCAyNDUpO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAyMjMzNTtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICB3aWR0aDogMTg5cHg7XHJcbiAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcclxuICAgIHBhZGRpbmc6IDVweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICAgIG9wYWNpdHk6IDA7XHJcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLW91dDtcclxuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xyXG59XHJcblxyXG4uZHJvcGRvd24+ZGl2OmhvdmVyIHtcclxuICAgIGJhY2tncm91bmQ6ICMwNzU4ODQ7XHJcbn1cclxuXHJcbi5kcm9wZG93bj5kaXYge1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBwYWRkaW5nOiAzcHg7XHJcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLW91dDtcclxufVxyXG5cclxuLmNvbnRlbnQge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgbWFyZ2luOiAwIDEwcHggMHB4IDEwcHg7XHJcbiAgICBtYXgtaGVpZ2h0OiAzMjBweCAhaW1wb3J0YW50O1xyXG4gICAgb3ZlcmZsb3cteTogc2Nyb2xsICFpbXBvcnRhbnQ7XHJcbiAgICBjb2xvcjogIzAyMjMzNTtcclxufVxyXG5cclxuLmNvbnRlbnQ+aDEge1xyXG4gICAgZm9udC1zaXplOiAyOHB4O1xyXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICM5NmE4YjI7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogMTBweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDE1cHg7XHJcbn1cclxuXHJcbi5wcmV2aWV3IHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiAyMDBweDtcclxufVxyXG5cclxuLmgge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbi5wb3Mge1xyXG4gICAgcmlnaHQ6IC01M3B4ICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi53cmFwcGVyIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG5cclxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA4MDBweCkge1xyXG4gICAgLm9wdGlvbnMge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTNweDtcclxuICAgIH1cclxuICAgIC5kcm9wZG93biB7XHJcbiAgICAgICAgdG9wOiAyOHB4O1xyXG4gICAgfVxyXG59XHJcblxyXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDUwMHB4KSB7XHJcbiAgICAub3B0aW9ucyB7XHJcbiAgICAgICAgZm9udC1zaXplOiA4cHg7XHJcbiAgICB9XHJcbiAgICAuZHJvcGRvd24ge1xyXG4gICAgICAgIHRvcDogMjFweDtcclxuICAgIH1cclxufVxyXG5cclxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA0MDBweCkge1xyXG4gICAgLm9wdGlvbnMge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogNnB4O1xyXG4gICAgfVxyXG4gICAgLmRyb3Bkb3duIHtcclxuICAgICAgICB0b3A6IDE1cHg7XHJcbiAgICB9XHJcbn1cclxuXHJcbi5teVNsaWRlcyB7XHJcbiAgICBkaXNwbGF5OiBub25lO1xyXG59Il19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](TopbarComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-topbar',
                templateUrl: './topbar.component.html',
                styleUrls: ['./topbar.component.css'],
            }]
    }], function () { return [{ type: _services_observers_service__WEBPACK_IMPORTED_MODULE_6__["ObserversService"] }]; }, null); })();


/***/ }),

/***/ "6ONb":
/*!***********************************************!*\
  !*** ./src/app/services/observers.service.ts ***!
  \***********************************************/
/*! exports provided: ObserversService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObserversService", function() { return ObserversService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");




class ObserversService {
    constructor() {
        this.option = new rxjs__WEBPACK_IMPORTED_MODULE_1__["ReplaySubject"](1);
        this.opt = this.option.asObservable();
        this.start = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.prstart = this.start.asObservable();
        this.pathFind = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.algopick = this.pathFind.asObservable();
        this.passGrid = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.grid = this.passGrid.asObservable();
        this.init = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.initiate = this.init.asObservable();
    }
    changeOpt(o) {
        this.option.next(o);
    }
    swap() {
        this.start.next();
    }
    chooseAlgorithm(m) {
        this.pathFind.next(m);
    }
    deliver(g) {
        this.passGrid.next(g);
    }
    initAlgo() {
        this.init.next();
    }
}
ObserversService.ɵfac = function ObserversService_Factory(t) { return new (t || ObserversService)(); };
ObserversService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: ObserversService, factory: ObserversService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ObserversService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root',
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "Eimf":
/*!*******************************************!*\
  !*** ./src/app/mazeAlgos/recursiveDiv.ts ***!
  \*******************************************/
/*! exports provided: recursiveDivision */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recursiveDivision", function() { return recursiveDivision; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");

class recursiveDivision {
    constructor(grid) {
        this.grid = new Array();
        this.grid = grid;
    }
    recDiv(sx, sy, ex, ey) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const width = ex - sx;
            const height = ey - sy;
            //base case
            if (height < 2 || width < 2) {
                return;
            }
            //determine orientation and recurse
            if (width < height) {
                //horizontal
                let xp = this.rand(ex - sx + 1) + sx; //passage
                let yp = this.rand(ey - sy - 1) + sy + 1; //start of the wall
                if (this.grid[yp][sx - 1].type == 'empty') {
                    xp = sx;
                }
                else if (this.grid[yp][ex + 1].type == 'empty') {
                    xp = ex;
                }
                for (let i = sx; i <= ex; i++) {
                    if (i != xp) {
                        this.grid[yp][i].color = '#022335';
                        this.grid[yp][i].type = 'wall';
                        yield this.sleep(40);
                    }
                }
                //upper subfield bounds
                this.recDiv(sx, sy, ex, yp - 1); //the animation looks cooler if we let the threads run in parallel ;)
                // lower subfield bounds
                this.recDiv(sx, yp + 1, ex, ey);
            }
            else {
                //vertical
                let xp = this.rand(ex - 1 - (sx + 1) + 1) + sx + 1;
                let yp = this.rand(ey + 1 - sy) + sy;
                if (this.grid[sy - 1][xp].type == 'empty') {
                    yp = sy;
                }
                else if (this.grid[ey + 1][xp].type == 'empty') {
                    yp = ey;
                }
                for (let i = sy; i <= ey; i++) {
                    if (i != yp) {
                        this.grid[i][xp].color = '#022335';
                        this.grid[i][xp].type = 'wall';
                        yield this.sleep(40);
                    }
                }
                //left subfield bounds
                this.recDiv(sx, sy, xp - 1, ey);
                // right subfield bounds
                this.recDiv(xp + 1, sy, ex, ey);
            }
        });
    }
    perimeter() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            for (let i = 0; i < 19; i++) {
                this.grid[i][0].color = '#022335';
                this.grid[i][0].type = 'wall';
                this.grid[i][44].color = '#022335';
                this.grid[i][44].type = 'wall';
                yield this.sleep(10);
            }
            for (let i = 0; i < 45; i++) {
                this.grid[0][i].color = '#022335';
                this.grid[0][i].type = 'wall';
                this.grid[18][i].color = '#022335';
                this.grid[18][i].type = 'wall';
                yield this.sleep(10);
            }
        });
    }
    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    rand(x) {
        return Math.floor(Math.random() * x);
    }
}


/***/ }),

/***/ "F18P":
/*!**************************************!*\
  !*** ./src/app/pathFindAlgos/BFS.ts ***!
  \**************************************/
/*! exports provided: BFS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BFS", function() { return BFS; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");

class BFS {
    constructor(grid, graph) {
        this.grid = grid;
        this.graph = graph;
    }
    bfs(s, e) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let q = [];
            q.push(s);
            const p = this.graph[s].pos;
            this.grid[p[0]][p[1]].visited = true;
            let found = false;
            let path = [];
            let previous = [];
            this.graph.forEach((v) => {
                previous.push(null);
            });
            while (q.length > 0) {
                let n = q.shift();
                path.push(n);
                yield this.sleep(40);
                if (n == e) {
                    found = true;
                    break;
                }
                this.graph[n].neighbors.forEach((el) => {
                    const p = this.graph[el[0]].pos;
                    if (!this.grid[p[0]][p[1]].visited) {
                        this.grid[p[0]][p[1]].visited = true;
                        previous[el[0]] = n;
                        q.push(el[0]);
                        this.animator(p[0], p[1]);
                    }
                });
            }
            if (found) {
                this.clear();
                let cr = previous[e];
                let path = [e];
                while (cr != s) {
                    path.push(cr);
                    cr = previous[cr];
                }
                for (let i = path.length - 1; i > -1; i--) {
                    const v = path[i];
                    const p = this.graph[v].pos;
                    this.grid[p[0]][p[1]].color = 'yellow';
                    this.grid[p[0]][p[1]].type = 'path';
                    yield this.sleep(50);
                }
            }
            else {
                confirm('not connected');
            }
        });
    }
    clear() {
        this.grid.forEach((r) => {
            r.forEach((c) => {
                if (c.type == 'visited') {
                    c.color = 'white';
                    c.type = 'empty';
                    c.visited = false;
                    c.end = false;
                }
            });
        });
    }
    animator(x, y) {
        if (this.grid[x][y].type == 'empty') {
            this.grid[x][y].type = 'visited';
            this.grid[x][y].color = '#4d8ab1';
        }
    }
    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}


/***/ }),

/***/ "Fatp":
/*!**************************************!*\
  !*** ./src/app/pathFindAlgos/nra.ts ***!
  \**************************************/
/*! exports provided: NRA */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NRA", function() { return NRA; });
/* harmony import */ var ts_heapq__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ts-heapq */ "zSzt");
/* harmony import */ var ts_heapq__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ts_heapq__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _globalVar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../globalVar */ "3N5j");


class NRA {
    constructor(ids, graph, grid) {
        this.pqs = [];
        this.dicts = [];
        this.spds = [];
        this.paths = [];
        this.bounds = [];
        this.visited = [];
        this.minDist = 100000;
        this.timers = 0;
        this.path_mutex = 0;
        this.LBq = new ts_heapq__WEBPACK_IMPORTED_MODULE_0__["Heapq"]([], this.comparator);
        this.bests = {};
        this.found = false;
        this.best = null;
        const t = ids.length;
        for (let i = 0; i < t; i++) {
            let spd = new Array(graph.length).fill(this.minDist);
            let path = new Array(graph.length).fill(null);
            let v = new Array(graph.length).fill(false);
            this.spds.push(spd);
            this.paths.push(path);
            this.visited.push(v);
        }
        for (let i = 0; i < t; i++) {
            let heapq = new ts_heapq__WEBPACK_IMPORTED_MODULE_0__["Heapq"]([], this.comparator);
            this.pqs.push(heapq);
            this.dicts.push({});
        }
        graph.forEach(() => {
            this.bounds.push([this.minDist, 0]);
        });
        this.graph = graph;
        this.grid = grid;
    }
    comparator(a, b) {
        return a[0] < b[0];
    }
    checkBest() {
        if (!this.best || this.LBq.length() == 0) {
            return;
        }
        let v = this.LBq.top();
        while (this.bests[v[1]] && this.LBq.length() > 0) {
            this.LBq.pop();
            if (this.LBq.length() > 0) {
                v = this.LBq.top();
            }
        }
        if (this.LBq.length() == 0) {
            return;
        }
        if (v[0] > this.bounds[this.best][1]) {
            console.log('cond');
            this.found = true;
        }
    }
    updateBest(id) {
        this.bests[id] = true;
        if (!this.best) {
            this.best = id;
        }
        else if (this.bounds[this.best][1] > this.bounds[id][1]) {
            this.best = id;
        }
    }
    addNode(id, dist, i) {
        if (this.dicts[i][id]) {
            this.removeNode(id, i);
        }
        let e = [dist, id];
        this.dicts[i][id] = e;
        this.pqs[i].push(e);
    }
    removeNode(id, i) {
        this.dicts[i][id][1] = 'removed';
        delete this.dicts[i][id];
    }
    popNode(i) {
        while (this.pqs[i].length() > 0) {
            let e = this.pqs[i].pop();
            if (e[1] != 'removed') {
                delete this.dicts[i][e[1]];
                return e;
            }
        }
        return 'done';
    }
    Dijkstra(i) {
        let v = this.popNode(i);
        if (v == 'done') {
            return 'done';
        }
        this.timers++;
        setTimeout(() => {
            this.animator(v[1]);
            this.timers--;
        }, 10);
        this.visited[i][v[1]] == true;
        this.graph[v[1]].neighbors.forEach((n) => {
            if (!this.visited[i][n[0]]) {
                if (this.spds[i][n[0]] > this.spds[i][v[1]] + n[1]) {
                    this.spds[i][n[0]] = this.spds[i][v[1]] + n[1];
                    this.paths[i][n[0]] = this.paths[i][v[1]] + '->' + n[0];
                    this.addNode(n[0], this.spds[i][n[0]], i);
                }
            }
        });
        return v;
    }
    btmK(ids) {
        for (let i = 0; i < ids.length; i++) {
            this.spds[i][ids[i]] = 0;
            this.paths[i][ids[i]] = ids[i] + '';
            this.addNode(ids[i], 0, i);
        }
        while (!this.found) {
            for (let i = 0; i < ids.length; i++) {
                let v = this.Dijkstra(i);
                if (v == 'done') {
                    this.found = true;
                    break;
                }
                if (v[0] < this.bounds[v[1]][0]) {
                    this.bounds[v[1]][0] = v[0];
                }
                this.LBq.push([this.bounds[v[1]][0], v[1]]);
                let max = -1;
                for (let k = 0; k < ids.length; k++) {
                    if (this.spds[k][v[1]] > max) {
                        max = this.spds[k][v[1]];
                    }
                }
                this.bounds[v[1]][1] = max;
                if (max < this.minDist) {
                    this.updateBest(v[1]);
                }
            }
            this.checkBest();
        }
        if (!this.best) {
            confirm('meeting point doesnt exist');
            let int = setInterval(() => {
                if (this.timers <= 0) {
                    _globalVar__WEBPACK_IMPORTED_MODULE_1__["State"].inProgress = false;
                    clearInterval(int);
                }
            }, 10);
            return;
        }
        let int = setInterval(() => {
            if (this.timers == 0) {
                this.timers = -1;
                let x = this.graph[this.best].pos[0];
                let y = this.graph[this.best].pos[1];
                this.grid[x][y].end = true;
                this.grid[x][y].meet = true;
                this.grid[x][y].color = 'yellow';
                this.clear();
                this.printPaths(ids);
                clearInterval(int);
            }
        }, 10);
    }
    animator(id) {
        const x = this.graph[id].pos[0];
        const y = this.graph[id].pos[1];
        if (this.grid[x][y].type == 'empty') {
            this.grid[x][y].type = 'visited';
            this.grid[x][y].color = '#de00ff';
        }
    }
    clear() {
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                if (this.grid[i][j].type == 'visited') {
                    this.grid[i][j].type = 'empty';
                    this.grid[i][j].color = 'white';
                }
            }
        }
    }
    printPaths(ids) {
        for (let i = 0; i < ids.length; i++) {
            let path = this.paths[i][this.best]
                .split('->')
                .map((p) => parseInt(p));
            path.forEach((e, index) => {
                this.path_mutex++;
                setTimeout(() => {
                    let x = this.graph[e].pos[0];
                    let y = this.graph[e].pos[1];
                    if (this.grid[x][y].type == 'empty' || this.grid[x][y].end) {
                        this.grid[x][y].color = 'yellow';
                        this.grid[x][y].type = 'path';
                    }
                    this.path_mutex--;
                }, 70 * index);
            });
        }
        let int = setInterval(() => {
            if (this.path_mutex <= 0) {
                _globalVar__WEBPACK_IMPORTED_MODULE_1__["State"].inProgress = false;
                clearInterval(int);
            }
        }, 10);
    }
}


/***/ }),

/***/ "ISgX":
/*!***********************************!*\
  !*** ./src/app/mazeAlgos/edge.ts ***!
  \***********************************/
/*! exports provided: Edge */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Edge", function() { return Edge; });
class Edge {
    constructor(start, end) {
        this.s = start;
        this.e = end;
    }
}


/***/ }),

/***/ "Ludi":
/*!****************************************!*\
  !*** ./src/app/grid/grid.component.ts ***!
  \****************************************/
/*! exports provided: GridComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GridComponent", function() { return GridComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _cell__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cell */ "MOy4");
/* harmony import */ var _pathFindAlgos_fightTheAlgo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../pathFindAlgos/fightTheAlgo */ "jMDI");
/* harmony import */ var _grid_builder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../grid/builder */ "nvla");
/* harmony import */ var _globalVar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../globalVar */ "3N5j");
/* harmony import */ var _services_observers_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/observers.service */ "6ONb");
/* harmony import */ var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/drag-drop */ "5+WD");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "ofXK");









function GridComponent_ng_container_20_div_1_i_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "i", 15);
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("cdkDragDisabled", !ctx_r6.draggable || ctx_r6.option == 0);
} }
function GridComponent_ng_container_20_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("mouseover", function GridComponent_ng_container_20_div_1_Template_div_mouseover_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9); const j_r5 = ctx.index; const i_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().index; const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r7.hovered(i_r2, j_r5); })("click", function GridComponent_ng_container_20_div_1_Template_div_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9); const j_r5 = ctx.index; const i_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().index; const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r10.setstarter(i_r2, j_r5); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, GridComponent_ng_container_20_div_1_i_1_Template, 1, 1, "i", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const cell_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("background-color", cell_r4.color);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("grid-item-borders", cell_r4.type == "wall")("grid-item-path", cell_r4.type == "path")("magenta", cell_r4.type == "visited" || cell_r4.type == "wall" || cell_r4.type == "start");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", cell_r4.end);
} }
function GridComponent_ng_container_20_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, GridComponent_ng_container_20_div_1_Template, 2, 9, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const row_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", row_r1);
} }
class GridComponent {
    constructor(share) {
        this.share = share;
        //graph info
        this.grid = [];
        this.columns = 45;
        this.rows = 19;
        this.c = [];
        this.next = [];
        //starters for fight the algorithm
        this.sx = 9;
        this.sy = 4;
        this.ex = 9;
        this.ey = 30;
        //options
        this.clicked = false;
        this.option = 0;
        this.observers = [];
        this.builder = new _grid_builder__WEBPACK_IMPORTED_MODULE_3__["Builder"]();
        let id = 0;
        for (let i = 0; i < this.rows; i++) {
            let cells = [];
            for (let j = 0; j < this.columns; j++) {
                cells.push(new _cell__WEBPACK_IMPORTED_MODULE_1__["Cell"]('empty', 'white', id));
                id++;
            }
            this.grid.push(cells);
        }
    }
    ngOnInit() {
        this.observers.push(this.share.opt.subscribe((opt) => {
            this.option = opt;
            if (opt == 10) {
                this.option = 2;
                this.setPoints();
            }
        }), this.share.initiate.subscribe(() => {
            this.start();
        }));
        this.share.deliver(this.grid);
    }
    ngOnDestroy() {
        this.observers.forEach((observer) => {
            observer.unsubscribe();
        });
    }
    hovered(i, j) {
        if (_globalVar__WEBPACK_IMPORTED_MODULE_4__["State"].inProgress) {
            return;
        }
        if (_globalVar__WEBPACK_IMPORTED_MODULE_4__["State"].type == 'f') {
            this.next = [i, j];
        }
        if (this.option == 0) {
            if (this.clicked &&
                this.grid[i][j].type == 'empty' &&
                !this.grid[i][j].end) {
                this.grid[i][j].color = '#022335';
                this.grid[i][j].type = 'wall';
            }
        }
    }
    setstarter(i, j) {
        if (_globalVar__WEBPACK_IMPORTED_MODULE_4__["State"].points.length >= 10 ||
            this.option != 2 ||
            _globalVar__WEBPACK_IMPORTED_MODULE_4__["State"].inProgress ||
            _globalVar__WEBPACK_IMPORTED_MODULE_4__["State"].fightR) {
            return;
        }
        else if (_globalVar__WEBPACK_IMPORTED_MODULE_4__["State"].type == 'sp') {
            if (_globalVar__WEBPACK_IMPORTED_MODULE_4__["State"].points.length == 2) {
                return; //only two points for path finding
            }
        }
        else if (_globalVar__WEBPACK_IMPORTED_MODULE_4__["State"].type == 'f') {
            if (_globalVar__WEBPACK_IMPORTED_MODULE_4__["State"].points.length == 1) {
                return;
            }
        }
        if (this.grid[i][j].type == 'empty') {
            _globalVar__WEBPACK_IMPORTED_MODULE_4__["State"].points.push([i, j]);
            this.grid[i][j].type = 'start';
            this.grid[i][j].color = 'blue';
        }
    }
    setPoints() {
        this.setstarter(this.sx, this.sy);
        this.grid[this.ex][this.ey].end = true;
        this.c = [this.ex, this.ey];
    }
    mouseUp() {
        if (_globalVar__WEBPACK_IMPORTED_MODULE_4__["State"].inProgress || this.option == 0 || _globalVar__WEBPACK_IMPORTED_MODULE_4__["State"].fightR) {
            return;
        }
        if (_globalVar__WEBPACK_IMPORTED_MODULE_4__["State"].type == 'f') {
            this.grid[this.next[0]][this.next[1]].end = true;
            this.grid[this.c[0]][this.c[1]].end = false;
            this.c = [this.next[0], this.next[1]];
        }
    }
    start() {
        let graph = this.builder.buildgraph(this.grid);
        let astar = new _pathFindAlgos_fightTheAlgo__WEBPACK_IMPORTED_MODULE_2__["modAstar"](this.grid, graph, this.grid[this.c[0]][this.c[1]].id);
        _globalVar__WEBPACK_IMPORTED_MODULE_4__["State"].fightR = true;
        astar.modedAstar(this.grid[9][4].id).then(() => {
            _globalVar__WEBPACK_IMPORTED_MODULE_4__["State"].fightR = false;
        });
    }
    mouseDown() {
        this.clicked = !this.clicked;
    }
    get gridarray() {
        return this.grid;
    }
    get draggable() {
        return _globalVar__WEBPACK_IMPORTED_MODULE_4__["State"].type == 'f' && !_globalVar__WEBPACK_IMPORTED_MODULE_4__["State"].fightR;
    }
    disable() {
        this.clicked = false;
    }
}
GridComponent.ɵfac = function GridComponent_Factory(t) { return new (t || GridComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_observers_service__WEBPACK_IMPORTED_MODULE_5__["ObserversService"])); };
GridComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: GridComponent, selectors: [["app-grid"]], decls: 21, vars: 1, consts: [[1, "main"], [1, "points"], [1, "info"], [1, "squere", "wall"], [1, "squere", "visited"], [1, "squere", "meeting"], [1, "squere", "path"], [1, "squere", "start"], [1, "squere"], [1, "fas", "fa-map-marker"], ["cdkDropListGroup", "", 1, "grid-container", 3, "mouseup", "mousedown", "mouseenter"], [4, "ngFor", "ngForOf"], ["class", "grid-item", "cdkDropList", "", 3, "background-color", "grid-item-borders", "grid-item-path", "magenta", "mouseover", "click", 4, "ngFor", "ngForOf"], ["cdkDropList", "", 1, "grid-item", 3, "mouseover", "click"], ["class", "fas fa-map-marker", "cdkDrag", "", "cdkDragBoundary", ".grid-container", 3, "cdkDragDisabled", 4, "ngIf"], ["cdkDrag", "", "cdkDragBoundary", ".grid-container", 1, "fas", "fa-map-marker", 3, "cdkDragDisabled"]], template: function GridComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, " Wall ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, " Visited ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, " Path ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, " Start ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "i", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, " End Point ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("mouseup", function GridComponent_Template_div_mouseup_19_listener() { return ctx.mouseUp(); })("mousedown", function GridComponent_Template_div_mousedown_19_listener() { return ctx.mouseDown(); })("mouseenter", function GridComponent_Template_div_mouseenter_19_listener() { return ctx.disable(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](20, GridComponent_ng_container_20_Template, 2, 1, "ng-container", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.gridarray);
    } }, directives: [_angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_6__["CdkDropListGroup"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgForOf"], _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_6__["CdkDropList"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgIf"], _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_6__["CdkDrag"]], styles: [".grid-container[_ngcontent-%COMP%] {\r\n    display: grid;\r\n    grid-template-columns: repeat(45, 1fr);\r\n    border-bottom: 1px solid rgba(182, 188, 255, 0.8);\r\n    border-right: 1px solid rgba(182, 188, 255, 0.8);\r\n}\r\n\r\n.grid-item[_ngcontent-%COMP%] {\r\n    border-left: 1px solid rgba(182, 188, 255, 0.8);\r\n    border-top: 1px solid rgba(182, 188, 255, 0.8);\r\n    height: 22px;\r\n    transition: background-color .3s;\r\n    display: grid;\r\n    place-items: center;\r\n    color: white;\r\n}\r\n\r\n.grid-item[_ngcontent-%COMP%] > i[_ngcontent-%COMP%] {\r\n    color: orangered;\r\n    animation-name: fall;\r\n    animation-duration: .3s;\r\n}\r\n\r\n@keyframes fall {\r\n    0% {\r\n        transform: translateY(-40px);\r\n    }\r\n    100% {\r\n        transform: translateY(0px);\r\n    }\r\n}\r\n\r\n.grid-item-borders[_ngcontent-%COMP%] {\r\n    border: 1px solid #022335 !important;\r\n}\r\n\r\n.grid-item-path[_ngcontent-%COMP%] {\r\n    border: 1px solid yellow;\r\n    animation-name: stretch;\r\n    animation-duration: .4s;\r\n    animation-timing-function: ease-out;\r\n}\r\n\r\n.main[_ngcontent-%COMP%] {\r\n    margin-top: 4.3%;\r\n    padding: 1.7rem;\r\n    text-align: center;\r\n}\r\n\r\n.main[_ngcontent-%COMP%] > h1[_ngcontent-%COMP%] {\r\n    font-size: 2vw;\r\n}\r\n\r\n.squere[_ngcontent-%COMP%] {\r\n    height: 25px;\r\n    width: 25px;\r\n    margin-right: 8px;\r\n}\r\n\r\n.wall[_ngcontent-%COMP%] {\r\n    background-color: #022335;\r\n}\r\n\r\n.visited[_ngcontent-%COMP%] {\r\n    background-color: #4d8ab1;\r\n}\r\n\r\n.path[_ngcontent-%COMP%] {\r\n    background-color: yellow;\r\n}\r\n\r\n.start[_ngcontent-%COMP%] {\r\n    background-color: blue;\r\n}\r\n\r\n.meeting[_ngcontent-%COMP%] {\r\n    background-color: #de00ff;\r\n}\r\n\r\n.points[_ngcontent-%COMP%] {\r\n    margin-bottom: 20px;\r\n    display: flex;\r\n    flex-direction: row;\r\n    justify-content: center;\r\n    gap: 4vw;\r\n}\r\n\r\n.info[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    flex-direction: row;\r\n    align-items: center;\r\n    color: #022335;\r\n    font-size: 1.7vw;\r\n    font-weight: bold;\r\n}\r\n\r\n.squere[_ngcontent-%COMP%] > i[_ngcontent-%COMP%] {\r\n    color: orangered;\r\n    font-size: 22px;\r\n    margin-bottom: 5px;\r\n}\r\n\r\n.points[_ngcontent-%COMP%] > [_ngcontent-%COMP%]:last-child {\r\n    margin-left: -15px;\r\n}\r\n\r\n.magenta[_ngcontent-%COMP%] {\r\n    animation-name: stretch;\r\n    animation-duration: .4s;\r\n    animation-timing-function: ease-out;\r\n}\r\n\r\n.cn[_ngcontent-%COMP%] {\r\n    background-color: #19ec05 !important;\r\n}\r\n\r\n@keyframes stretch {\r\n    0% {\r\n        transform: scale(.3);\r\n        border-radius: 50%;\r\n    }\r\n    100% {\r\n        transform: scale(1);\r\n    }\r\n}\r\n\r\n@media only screen and (max-width: 880px) {\r\n    .main[_ngcontent-%COMP%] {\r\n        margin-top: 9%;\r\n    }\r\n}\r\n\r\n@media only screen and (max-width: 720px) {\r\n    .main[_ngcontent-%COMP%] {\r\n        margin-top: 10%;\r\n    }\r\n}\r\n\r\n@media only screen and (max-width: 560px) {\r\n    .main[_ngcontent-%COMP%] {\r\n        margin-top: 19%;\r\n    }\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyaWQuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGFBQWE7SUFDYixzQ0FBc0M7SUFDdEMsaURBQWlEO0lBQ2pELGdEQUFnRDtBQUNwRDs7QUFFQTtJQUNJLCtDQUErQztJQUMvQyw4Q0FBOEM7SUFDOUMsWUFBWTtJQUNaLGdDQUFnQztJQUNoQyxhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxnQkFBZ0I7SUFDaEIsb0JBQW9CO0lBQ3BCLHVCQUF1QjtBQUMzQjs7QUFFQTtJQUNJO1FBQ0ksNEJBQTRCO0lBQ2hDO0lBQ0E7UUFDSSwwQkFBMEI7SUFDOUI7QUFDSjs7QUFFQTtJQUNJLG9DQUFvQztBQUN4Qzs7QUFFQTtJQUNJLHdCQUF3QjtJQUN4Qix1QkFBdUI7SUFDdkIsdUJBQXVCO0lBQ3ZCLG1DQUFtQztBQUN2Qzs7QUFFQTtJQUNJLGdCQUFnQjtJQUNoQixlQUFlO0lBQ2Ysa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksY0FBYztBQUNsQjs7QUFFQTtJQUNJLFlBQVk7SUFDWixXQUFXO0lBQ1gsaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0kseUJBQXlCO0FBQzdCOztBQUVBO0lBQ0kseUJBQXlCO0FBQzdCOztBQUVBO0lBQ0ksd0JBQXdCO0FBQzVCOztBQUVBO0lBQ0ksc0JBQXNCO0FBQzFCOztBQUVBO0lBQ0kseUJBQXlCO0FBQzdCOztBQUVBO0lBQ0ksbUJBQW1CO0lBQ25CLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsdUJBQXVCO0lBQ3ZCLFFBQVE7QUFDWjs7QUFFQTtJQUNJLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsbUJBQW1CO0lBQ25CLGNBQWM7SUFDZCxnQkFBZ0I7SUFDaEIsaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksZ0JBQWdCO0lBQ2hCLGVBQWU7SUFDZixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSx1QkFBdUI7SUFDdkIsdUJBQXVCO0lBQ3ZCLG1DQUFtQztBQUN2Qzs7QUFFQTtJQUNJLG9DQUFvQztBQUN4Qzs7QUFFQTtJQUNJO1FBQ0ksb0JBQW9CO1FBQ3BCLGtCQUFrQjtJQUN0QjtJQUNBO1FBQ0ksbUJBQW1CO0lBQ3ZCO0FBQ0o7O0FBRUE7SUFDSTtRQUNJLGNBQWM7SUFDbEI7QUFDSjs7QUFFQTtJQUNJO1FBQ0ksZUFBZTtJQUNuQjtBQUNKOztBQUVBO0lBQ0k7UUFDSSxlQUFlO0lBQ25CO0FBQ0oiLCJmaWxlIjoiZ3JpZC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmdyaWQtY29udGFpbmVyIHtcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg0NSwgMWZyKTtcclxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2JhKDE4MiwgMTg4LCAyNTUsIDAuOCk7XHJcbiAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCByZ2JhKDE4MiwgMTg4LCAyNTUsIDAuOCk7XHJcbn1cclxuXHJcbi5ncmlkLWl0ZW0ge1xyXG4gICAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCByZ2JhKDE4MiwgMTg4LCAyNTUsIDAuOCk7XHJcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgcmdiYSgxODIsIDE4OCwgMjU1LCAwLjgpO1xyXG4gICAgaGVpZ2h0OiAyMnB4O1xyXG4gICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAuM3M7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgcGxhY2UtaXRlbXM6IGNlbnRlcjtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxufVxyXG5cclxuLmdyaWQtaXRlbT5pIHtcclxuICAgIGNvbG9yOiBvcmFuZ2VyZWQ7XHJcbiAgICBhbmltYXRpb24tbmFtZTogZmFsbDtcclxuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogLjNzO1xyXG59XHJcblxyXG5Aa2V5ZnJhbWVzIGZhbGwge1xyXG4gICAgMCUge1xyXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNDBweCk7XHJcbiAgICB9XHJcbiAgICAxMDAlIHtcclxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMHB4KTtcclxuICAgIH1cclxufVxyXG5cclxuLmdyaWQtaXRlbS1ib3JkZXJzIHtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICMwMjIzMzUgIWltcG9ydGFudDtcclxufVxyXG5cclxuLmdyaWQtaXRlbS1wYXRoIHtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHllbGxvdztcclxuICAgIGFuaW1hdGlvbi1uYW1lOiBzdHJldGNoO1xyXG4gICAgYW5pbWF0aW9uLWR1cmF0aW9uOiAuNHM7XHJcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLW91dDtcclxufVxyXG5cclxuLm1haW4ge1xyXG4gICAgbWFyZ2luLXRvcDogNC4zJTtcclxuICAgIHBhZGRpbmc6IDEuN3JlbTtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuLm1haW4+aDEge1xyXG4gICAgZm9udC1zaXplOiAydnc7XHJcbn1cclxuXHJcbi5zcXVlcmUge1xyXG4gICAgaGVpZ2h0OiAyNXB4O1xyXG4gICAgd2lkdGg6IDI1cHg7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDhweDtcclxufVxyXG5cclxuLndhbGwge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAyMjMzNTtcclxufVxyXG5cclxuLnZpc2l0ZWQge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzRkOGFiMTtcclxufVxyXG5cclxuLnBhdGgge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogeWVsbG93O1xyXG59XHJcblxyXG4uc3RhcnQge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmx1ZTtcclxufVxyXG5cclxuLm1lZXRpbmcge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2RlMDBmZjtcclxufVxyXG5cclxuLnBvaW50cyB7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGdhcDogNHZ3O1xyXG59XHJcblxyXG4uaW5mbyB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBjb2xvcjogIzAyMjMzNTtcclxuICAgIGZvbnQtc2l6ZTogMS43dnc7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxufVxyXG5cclxuLnNxdWVyZT5pIHtcclxuICAgIGNvbG9yOiBvcmFuZ2VyZWQ7XHJcbiAgICBmb250LXNpemU6IDIycHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiA1cHg7XHJcbn1cclxuXHJcbi5wb2ludHM+Omxhc3QtY2hpbGQge1xyXG4gICAgbWFyZ2luLWxlZnQ6IC0xNXB4O1xyXG59XHJcblxyXG4ubWFnZW50YSB7XHJcbiAgICBhbmltYXRpb24tbmFtZTogc3RyZXRjaDtcclxuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogLjRzO1xyXG4gICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1vdXQ7XHJcbn1cclxuXHJcbi5jbiB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTllYzA1ICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbkBrZXlmcmFtZXMgc3RyZXRjaCB7XHJcbiAgICAwJSB7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSguMyk7XHJcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gICAgfVxyXG4gICAgMTAwJSB7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcclxuICAgIH1cclxufVxyXG5cclxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA4ODBweCkge1xyXG4gICAgLm1haW4ge1xyXG4gICAgICAgIG1hcmdpbi10b3A6IDklO1xyXG4gICAgfVxyXG59XHJcblxyXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDcyMHB4KSB7XHJcbiAgICAubWFpbiB7XHJcbiAgICAgICAgbWFyZ2luLXRvcDogMTAlO1xyXG4gICAgfVxyXG59XHJcblxyXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDU2MHB4KSB7XHJcbiAgICAubWFpbiB7XHJcbiAgICAgICAgbWFyZ2luLXRvcDogMTklO1xyXG4gICAgfVxyXG59Il19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](GridComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-grid',
                templateUrl: './grid.component.html',
                styleUrls: ['./grid.component.css'],
            }]
    }], function () { return [{ type: _services_observers_service__WEBPACK_IMPORTED_MODULE_5__["ObserversService"] }]; }, null); })();


/***/ }),

/***/ "MOy4":
/*!******************************!*\
  !*** ./src/app/grid/cell.ts ***!
  \******************************/
/*! exports provided: Cell */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cell", function() { return Cell; });
class Cell {
    constructor(type = '', color = '', id = 0) {
        this.type = '';
        this.color = '';
        this.id = 0;
        this.end = false;
        this.visited = false;
        this.meet = false;
        this.type = type;
        this.color = color;
        this.id = id;
    }
}


/***/ }),

/***/ "MVWA":
/*!**************************************!*\
  !*** ./src/app/pathFindAlgos/UCS.ts ***!
  \**************************************/
/*! exports provided: UCS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UCS", function() { return UCS; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var ts_heapq__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ts-heapq */ "zSzt");
/* harmony import */ var ts_heapq__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ts_heapq__WEBPACK_IMPORTED_MODULE_1__);


class UCS {
    constructor(grid, graph) {
        this.dict = {};
        this.pq = new ts_heapq__WEBPACK_IMPORTED_MODULE_1__["Heapq"]([], this.comparator);
        this.minDist = 100000;
        this.grid = grid;
        this.graph = graph;
    }
    addNode(id, dist) {
        if (this.dict[id]) {
            this.removeNode(id);
        }
        let e = [dist, id];
        this.dict[id] = e;
        this.pq.push(e);
    }
    removeNode(id) {
        this.dict[id][1] = 'removed';
        delete this.dict[id];
    }
    popNode() {
        while (this.pq.length() > 0) {
            let e = this.pq.pop();
            if (e[1] != 'removed') {
                delete this.dict[e[1]];
                return e;
            }
        }
        confirm('nodes are not connected');
        return 'done';
    }
    comparator(a, b) {
        return a[0] < b[0];
    }
    UCS(s, t) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let spd = new Array(this.graph.length).fill(this.minDist);
            let path = new Array(this.graph.length).fill(null);
            let explored = new Array(this.graph.length).fill(false);
            let found = false;
            path[s] = s + '';
            spd[s] = 0;
            this.addNode(s, spd[s]);
            while (this.pq.length() > 0) {
                let v = this.popNode();
                this.animator(v[1]);
                yield this.sleep(20);
                if (v[1] == 'done') {
                    break;
                }
                explored[v[1]] = true;
                if (t == v[1]) {
                    found = true;
                    break;
                }
                this.graph[v[1]].neighbors.forEach((n) => {
                    if (!explored[n[0]]) {
                        path[n[0]] = path[v[1]] + '->' + n[0];
                        spd[n[0]] = spd[v[1]] + n[1];
                        this.addNode(n[0], spd[n[0]]);
                    }
                });
            }
            if (found) {
                this.clear();
                let p = path[t].split('->').map((p) => parseInt(p));
                for (const v of p) {
                    let c = this.graph[v].pos;
                    if (this.grid[c[0]][c[1]].type == 'empty' ||
                        this.grid[c[0]][c[1]].end) {
                        this.grid[c[0]][c[1]].color = 'yellow';
                        this.grid[c[0]][c[1]].type = 'path';
                        yield this.sleep(30);
                    }
                }
            }
            else {
                confirm('nodes are not connected');
            }
        });
    }
    animator(id) {
        const x = this.graph[id].pos[0];
        const y = this.graph[id].pos[1];
        if (this.grid[x][y].type == 'empty') {
            this.grid[x][y].type = 'visited';
            this.grid[x][y].color = '#4d8ab1';
        }
    }
    clear() {
        this.grid.forEach((r) => {
            r.forEach((c) => {
                if (c.type == 'visited') {
                    c.color = 'white';
                    c.type = 'empty';
                    c.visited = false;
                    c.end = false;
                }
            });
        });
    }
    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}


/***/ }),

/***/ "NJtI":
/*!*******************************************!*\
  !*** ./src/app/services/top-k.service.ts ***!
  \*******************************************/
/*! exports provided: TopKService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TopKService", function() { return TopKService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _globalVar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../globalVar */ "3N5j");
/* harmony import */ var _grid_cell__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../grid/cell */ "MOy4");
/* harmony import */ var _pathFindAlgos_nra__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../pathFindAlgos/nra */ "Fatp");





class TopKService {
    constructor(grid) {
        this.graph = [];
        this.grid = grid;
    }
    chooseAlgo(o, graph, ids) {
        if (_globalVar__WEBPACK_IMPORTED_MODULE_1__["State"].inProgress) {
            return;
        }
        _globalVar__WEBPACK_IMPORTED_MODULE_1__["State"].inProgress = true;
        this.graph = graph;
        if (o == 5) {
            this.nra(ids);
        }
    }
    nra(ids) {
        let nra = new _pathFindAlgos_nra__WEBPACK_IMPORTED_MODULE_3__["NRA"](ids, this.graph, this.grid);
        nra.btmK(ids);
    }
}
TopKService.ɵfac = function TopKService_Factory(t) { return new (t || TopKService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_grid_cell__WEBPACK_IMPORTED_MODULE_2__["Cell"])); };
TopKService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: TopKService, factory: TopKService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](TopKService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_grid_cell__WEBPACK_IMPORTED_MODULE_2__["Cell"]]
            }] }]; }, null); })();


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _topbar_topbar_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./topbar/topbar.component */ "5Lta");
/* harmony import */ var _grid_grid_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./grid/grid.component */ "Ludi");




class AppComponent {
    constructor() {
        this.title = 'Visualizer';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 2, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-topbar");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-grid");
    } }, directives: [_topbar_topbar_component__WEBPACK_IMPORTED_MODULE_1__["TopbarComponent"], _grid_grid_component__WEBPACK_IMPORTED_MODULE_2__["GridComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LmNzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.css'],
            }]
    }], null, null); })();


/***/ }),

/***/ "VOHP":
/*!******************************!*\
  !*** ./src/app/grid/node.ts ***!
  \******************************/
/*! exports provided: Node */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Node", function() { return Node; });
class Node {
    constructor(id, pos) {
        this.id = 0;
        this.pos = []; //xAxis and yAxis on the grid
        this.neighbors = [];
        this.id = id;
        this.pos = pos;
    }
    setneighbor(id, cost, direction = 0) {
        let n = [id, cost, direction]; //we need the direction for the recursive backtracker
        this.neighbors.push(n);
    }
}


/***/ }),

/***/ "XhT1":
/*!***************************************************!*\
  !*** ./src/app/mazeAlgos/recursiveBacktracker.ts ***!
  \***************************************************/
/*! exports provided: recBacktracker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recBacktracker", function() { return recBacktracker; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _grid_node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../grid/node */ "VOHP");


class recBacktracker {
    constructor(grid) {
        this.graph = [];
        this.grid = grid;
    }
    init() {
        let id = 0;
        this.graph = [];
        this.grid.forEach((row) => {
            row.forEach((c) => {
                c.color = '#022335';
                c.type = 'wall';
                c.visited = false;
            });
        });
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                this.graph.push(new _grid_node__WEBPACK_IMPORTED_MODULE_1__["Node"](id, [i, j]));
                id++;
            }
        }
        //determine the neighbors as well as the direction of the walls in between
        //each node must be surrounded by walls
        for (let i = 1; i < this.grid.length; i += 2) {
            for (let j = 1; j < this.grid[i].length; j += 2) {
                id = this.grid[i][j].id;
                if (j - 2 >= 0) {
                    this.graph[id].setneighbor(this.grid[i][j - 2].id, 1, 1); //west
                }
                if (i - 2 >= 0) {
                    this.graph[id].setneighbor(this.grid[i - 2][j].id, 1, 2); //north
                }
                if (j + 2 < 45) {
                    this.graph[id].setneighbor(this.grid[i][j + 2].id, 1, 3); //east
                }
                if (i + 2 < 19) {
                    this.graph[id].setneighbor(this.grid[i + 2][j].id, 1, 4); //south
                }
            }
        }
    }
    //iterative version of recursive backtracker using a stack
    DFS(x, y) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            //mark current as visited
            let stack = [];
            let current = this.grid[x][y];
            current.visited = true;
            stack.push(current);
            while (stack.length > 0) {
                let ns = this.neighbors(current.id);
                if (ns.length > 0) {
                    //choose a neighbor
                    let i = this.rand(ns.length);
                    let x = ns[i][0];
                    let y = ns[i][1];
                    let d = ns[i][2];
                    //determine the wall to remove in between
                    let w = this.removeWall(x, y, d);
                    current.color = 'white';
                    current.type = 'empty';
                    yield this.sleep(50);
                    w.color = 'white';
                    w.type = 'empty';
                    current = this.grid[x][y];
                    current.visited = true;
                    stack.push(current);
                }
                else {
                    current.color = 'white';
                    current.type = 'empty';
                    current = stack.pop(); //backtrack
                }
            }
        });
    }
    //get the neighbors if any
    neighbors(id) {
        let p;
        let ns = [];
        this.graph[id].neighbors.forEach((n) => {
            p = this.graph[n[0]].pos;
            if (!this.grid[p[0]][p[1]].visited) {
                ns.push([p[0], p[1], n[2]]);
            }
        });
        return ns;
    }
    //get the wall between the current cell and neighbor based on the direction
    removeWall(x, y, direction) {
        let w;
        if (direction == 1) {
            w = this.grid[x][y + 1];
        }
        else if (direction == 2) {
            w = this.grid[x + 1][y];
        }
        else if (direction == 3) {
            w = this.grid[x][y - 1];
        }
        else if (direction == 4) {
            w = this.grid[x - 1][y];
        }
        return w;
    }
    rand(x) {
        return Math.floor(Math.random() * x);
    }
    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _topbar_topbar_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./topbar/topbar.component */ "5Lta");
/* harmony import */ var _grid_grid_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./grid/grid.component */ "Ludi");
/* harmony import */ var _services_observers_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./services/observers.service */ "6ONb");
/* harmony import */ var _services_mazes_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./services/mazes.service */ "xVYf");
/* harmony import */ var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/cdk/drag-drop */ "5+WD");
/* harmony import */ var _services_pathfind_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./services/pathfind.service */ "ungK");
/* harmony import */ var _services_top_k_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./services/top-k.service */ "NJtI");












class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [_services_observers_service__WEBPACK_IMPORTED_MODULE_6__["ObserversService"], _services_mazes_service__WEBPACK_IMPORTED_MODULE_7__["MazesService"], _services_pathfind_service__WEBPACK_IMPORTED_MODULE_9__["PathfindService"], _services_top_k_service__WEBPACK_IMPORTED_MODULE_10__["TopKService"]], imports: [[_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"], _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_8__["DragDropModule"]]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"], _topbar_topbar_component__WEBPACK_IMPORTED_MODULE_4__["TopbarComponent"], _grid_grid_component__WEBPACK_IMPORTED_MODULE_5__["GridComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"], _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_8__["DragDropModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"], _topbar_topbar_component__WEBPACK_IMPORTED_MODULE_4__["TopbarComponent"], _grid_grid_component__WEBPACK_IMPORTED_MODULE_5__["GridComponent"]],
                imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"], _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_8__["DragDropModule"]],
                providers: [_services_observers_service__WEBPACK_IMPORTED_MODULE_6__["ObserversService"], _services_mazes_service__WEBPACK_IMPORTED_MODULE_7__["MazesService"], _services_pathfind_service__WEBPACK_IMPORTED_MODULE_9__["PathfindService"], _services_top_k_service__WEBPACK_IMPORTED_MODULE_10__["TopKService"]],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]],
            }]
    }], null, null); })();


/***/ }),

/***/ "cYPB":
/*!****************************************!*\
  !*** ./src/app/pathFindAlgos/Astar.ts ***!
  \****************************************/
/*! exports provided: Astar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Astar", function() { return Astar; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var ts_heapq__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ts-heapq */ "zSzt");
/* harmony import */ var ts_heapq__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ts_heapq__WEBPACK_IMPORTED_MODULE_1__);


class Astar {
    constructor(grid, graph) {
        this.dict = {};
        this.pq = new ts_heapq__WEBPACK_IMPORTED_MODULE_1__["Heapq"]([], this.comparator);
        this.minDist = 100000;
        this.grid = grid;
        this.graph = graph;
    }
    addNode(id, dist) {
        if (this.dict[id]) {
            this.removeNode(id);
        }
        let e = [dist, id];
        this.dict[id] = e;
        this.pq.push(e);
    }
    removeNode(id) {
        this.dict[id][1] = 'removed';
        delete this.dict[id];
    }
    popNode() {
        while (this.pq.length() > 0) {
            let e = this.pq.pop();
            if (e[1] != 'removed') {
                delete this.dict[e[1]];
                return e;
            }
        }
        confirm('nodes are not connected');
        return 'done';
    }
    comparator(a, b) {
        return a[0] < b[0];
    }
    manh(s, e) {
        let p1 = this.graph[s].pos;
        let p2 = this.graph[e].pos;
        return Math.abs(p2[0] - p1[0]) + Math.abs(p2[1] - p1[1]);
    }
    Astar(s, t) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let spd = new Array(this.graph.length).fill(this.minDist);
            let path = new Array(this.graph.length).fill(null);
            let visited = new Array(this.graph.length).fill(false);
            let found = false;
            spd[s] = 0;
            path[s] = s + '';
            this.addNode(s, spd[s] + this.manh(s, t));
            while (this.pq.length() > 0) {
                let v = this.popNode();
                if (v == 'done') {
                    break;
                }
                this.animator(v[1]);
                yield this.sleep(50);
                visited[v[1]] = true;
                if (t == v[1]) {
                    found = true;
                    break;
                }
                this.graph[v[1]].neighbors.forEach((n) => {
                    if (!visited[n[0]]) {
                        if (spd[n[0]] > spd[v[1]] + n[1]) {
                            spd[n[0]] = spd[v[1]] + n[1];
                            path[n[0]] = path[v[1]] + '->' + n[0];
                            this.addNode(n[0], spd[n[0]] + this.manh(n[0], t));
                        }
                    }
                });
            }
            if (found) {
                this.clear();
                let p = path[t].split('->').map((p) => parseInt(p));
                for (const v of p) {
                    let c = this.graph[v].pos;
                    if (this.grid[c[0]][c[1]].type == 'empty' ||
                        this.grid[c[0]][c[1]].end) {
                        this.grid[c[0]][c[1]].color = 'yellow';
                        this.grid[c[0]][c[1]].type = 'path';
                        yield this.sleep(30);
                    }
                }
            }
            else {
                confirm('not connected');
            }
        });
    }
    animator(id) {
        const x = this.graph[id].pos[0];
        const y = this.graph[id].pos[1];
        if (this.grid[x][y].type == 'empty') {
            this.grid[x][y].type = 'visited';
            this.grid[x][y].color = '#4d8ab1';
        }
    }
    clear() {
        this.grid.forEach((r) => {
            r.forEach((c) => {
                if (c.type == 'visited') {
                    c.color = 'white';
                    c.type = 'empty';
                    c.visited = false;
                    c.end = false;
                }
            });
        });
    }
    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}


/***/ }),

/***/ "eD2H":
/*!*********************************************!*\
  !*** ./src/app/mazeAlgos/primsAlgorithm.ts ***!
  \*********************************************/
/*! exports provided: randomizedPrim */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomizedPrim", function() { return randomizedPrim; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _grid_cell__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../grid/cell */ "MOy4");
/* harmony import */ var _grid_node__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../grid/node */ "VOHP");



class randomizedPrim {
    constructor(grid) {
        this.graph = [];
        this.grid = grid;
    }
    init() {
        let id = 0;
        this.graph = [];
        this.grid.forEach((row) => {
            row.forEach((c) => {
                c.color = '#022335';
                c.type = 'wall';
                c.visited = false;
            });
        });
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                this.graph.push(new _grid_node__WEBPACK_IMPORTED_MODULE_2__["Node"](id, [i, j]));
                id++;
            }
        }
        //determine the neighbors as well as the direction of the walls in between
        //each node must be surrounded by walls
        for (let i = 1; i < this.grid.length; i += 2) {
            for (let j = 1; j < this.grid[i].length; j += 2) {
                id = this.grid[i][j].id;
                if (j - 2 >= 0) {
                    this.graph[id].setneighbor(this.grid[i][j - 2].id, 1, 1); //west
                }
                if (i - 2 >= 0) {
                    this.graph[id].setneighbor(this.grid[i - 2][j].id, 1, 2); //north
                }
                if (j + 2 < 45) {
                    this.graph[id].setneighbor(this.grid[i][j + 2].id, 1, 3); //east
                }
                if (i + 2 < 19) {
                    this.graph[id].setneighbor(this.grid[i + 2][j].id, 1, 4); //south
                }
            }
        }
    }
    randPrim(x, y) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            //starting node only node in set S, where S + V = G
            const pathSet = new Set();
            pathSet.add(this.grid[x][y]);
            while (pathSet.size > 0) {
                //get a random cell from the set S, mark it as visited
                let cell = this.getRandomCell(pathSet);
                cell.color = 'white';
                cell.type = 'empty';
                cell.visited = true;
                pathSet.delete(cell);
                yield this.sleep(20);
                //get the neighbors in graph V = G - S
                let neighbors = this.neighbors(cell.id);
                //determine the already visited neighbors, this will be the frontier of V
                let s = [];
                neighbors.forEach((n) => {
                    if (this.grid[n[0]][n[1]].visited) {
                        s.push(n);
                    }
                });
                //randomly connect to one of them if any
                let k = 0, l = 0, d = 0;
                if (s.length > 0) {
                    //get a random neighbor in S
                    let i = this.rand(s.length);
                    k = s[i][0];
                    l = s[i][1];
                    d = s[i][2];
                    //determine the wall to remove in between cell and s[i]
                    let w = this.removeWall(k, l, d);
                    //carve the passage between the cell and the neighbor
                    yield this.sleep(20);
                    w.color = 'white';
                    w.type = 'empty';
                    //mark the cell s[i], adding it into the S
                    yield this.sleep(20);
                    this.grid[k][l].type = 'empty';
                    this.grid[k][l].color = 'white';
                    this.grid[k][l].visited = true;
                }
                //add the unvisited neighbors in the new V into the set
                neighbors.forEach((n) => {
                    if (!this.grid[n[0]][n[1]].visited) {
                        pathSet.add(this.grid[n[0]][n[1]]);
                    }
                });
            }
        });
    }
    //get the wall between the current cell and neighbor based on the direction
    removeWall(x, y, direction) {
        let w;
        if (direction == 1) {
            w = this.grid[x][y + 1];
        }
        else if (direction == 2) {
            w = this.grid[x + 1][y];
        }
        else if (direction == 3) {
            w = this.grid[x][y - 1];
        }
        else {
            w = this.grid[x - 1][y];
        }
        return w;
    }
    // get a random cell from the set
    getRandomCell(set) {
        let index = this.rand(set.size);
        let cntr = 0;
        for (let key of set.keys()) {
            if (cntr++ === index) {
                return key;
            }
        }
        return new _grid_cell__WEBPACK_IMPORTED_MODULE_1__["Cell"]();
    }
    //get the neighbors if any
    neighbors(id) {
        let x, y;
        let ns = [];
        this.graph[id].neighbors.forEach((n) => {
            x = this.graph[n[0]].pos[0];
            y = this.graph[n[0]].pos[1];
            ns.push([x, y, n[2]]);
        });
        return ns;
    }
    rand(x) {
        return Math.floor(Math.random() * x);
    }
    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}


/***/ }),

/***/ "jMDI":
/*!***********************************************!*\
  !*** ./src/app/pathFindAlgos/fightTheAlgo.ts ***!
  \***********************************************/
/*! exports provided: modAstar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "modAstar", function() { return modAstar; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var ts_heapq__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ts-heapq */ "zSzt");
/* harmony import */ var ts_heapq__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ts_heapq__WEBPACK_IMPORTED_MODULE_1__);


class modAstar {
    constructor(grid, graph, e) {
        this.dict = {};
        this.pq = new ts_heapq__WEBPACK_IMPORTED_MODULE_1__["Heapq"]([], this.comparator);
        this.end = 0;
        this.minDist = 100000;
        this.grid = grid;
        this.graph = graph;
        this.end = e;
    }
    addNode(id, dist) {
        if (this.dict[id]) {
            this.removeNode(id);
        }
        let e = [dist, id];
        this.dict[id] = e;
        this.pq.push(e);
    }
    removeNode(id) {
        this.dict[id][1] = 'removed';
        delete this.dict[id];
    }
    popNode() {
        while (this.pq.length() > 0) {
            let e = this.pq.pop();
            if (e[1] != 'removed') {
                delete this.dict[e[1]];
                return e;
            }
        }
        return 'done';
    }
    comparator(a, b) {
        return a[0] < b[0];
    }
    manh(s) {
        let p1 = this.graph[s].pos;
        let p2 = this.graph[this.end].pos;
        return Math.abs(p2[0] - p1[0]) + Math.abs(p2[1] - p1[1]);
    }
    modedAstar(s) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let spd = new Array(this.graph.length).fill(this.minDist);
            let path = new Array(this.graph.length).fill(null);
            let visited = new Array(this.graph.length).fill(false);
            let found = false;
            spd[s] = 0;
            path[s] = s + '';
            this.addNode(s, spd[s] + this.manh(s));
            while (this.pq.length() > 0) {
                let v = this.popNode();
                this.animator(v[1]);
                yield this.sleep(20);
                if (v == 'done') {
                    break;
                }
                visited[v[1]] = true;
                if (this.end == v[1]) {
                    found = true;
                    break;
                }
                this.graph[v[1]].neighbors.forEach((n) => {
                    if (!this.isWall(n[0])) {
                        if (!visited[n[0]]) {
                            if (spd[n[0]] > spd[v[1]] + n[1]) {
                                spd[n[0]] = spd[v[1]] + n[1];
                                path[n[0]] = path[v[1]] + '->' + n[0];
                                this.addNode(n[0], spd[n[0]] + this.manh(n[0]));
                            }
                        }
                    }
                });
            }
            if (found) {
                this.clear();
                let p = path[this.end].split('->').map((p) => parseInt(p));
                for (const v of p) {
                    let c = this.graph[v].pos;
                    if (this.grid[c[0]][c[1]].type == 'empty' ||
                        this.grid[c[0]][c[1]].type == 'wall') {
                        this.grid[c[0]][c[1]].color = 'yellow';
                        this.grid[c[0]][c[1]].type = 'path';
                        yield this.sleep(30);
                    }
                }
            }
            else {
                confirm('not connected');
            }
        });
    }
    updateEnd(x, y) {
        this.end = this.grid[x][y].id;
    }
    isWall(id) {
        let p = this.graph[id].pos;
        return this.grid[p[0]][p[1]].type == 'wall';
    }
    animator(id) {
        const x = this.graph[id].pos[0];
        const y = this.graph[id].pos[1];
        if (this.grid[x][y].type == 'empty' && !this.grid[x][y].end) {
            this.grid[x][y].type = 'visited';
            this.grid[x][y].color = '#4d8ab1';
        }
    }
    clear() {
        this.grid.forEach((r) => {
            r.forEach((c) => {
                if (c.type == 'visited' && !c.end) {
                    c.color = 'white';
                    c.type = 'empty';
                    c.visited = false;
                    c.end = false;
                }
            });
        });
    }
    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}


/***/ }),

/***/ "nvla":
/*!*********************************!*\
  !*** ./src/app/grid/builder.ts ***!
  \*********************************/
/*! exports provided: Builder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Builder", function() { return Builder; });
/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node */ "VOHP");

class Builder {
    constructor() { }
    buildgraph(grid) {
        //construct the nodes
        let graph = [];
        let id = 0;
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                graph.push(new _node__WEBPACK_IMPORTED_MODULE_0__["Node"](id, [i, j]));
                id++;
            }
        }
        //determine the neighbors
        id = 0;
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (grid[i][j].type != 'wall') {
                    grid[i][j].visited = false;
                    if (j - 1 >= 0) {
                        if (grid[i][j - 1].type != 'wall') {
                            graph[id].setneighbor(grid[i][j - 1].id, 1);
                        }
                    }
                    if (i - 1 >= 0) {
                        if (grid[i - 1][j].type != 'wall') {
                            graph[id].setneighbor(grid[i - 1][j].id, 1);
                        }
                    }
                    if (j + 1 < 45) {
                        if (grid[i][j + 1].type != 'wall') {
                            graph[id].setneighbor(grid[i][j + 1].id, 1);
                        }
                    }
                    if (i + 1 < 19) {
                        if (grid[i + 1][j].type != 'wall') {
                            graph[id].setneighbor(grid[i + 1][j].id, 1);
                        }
                    }
                }
                id++;
            }
        }
        return graph;
    }
}


/***/ }),

/***/ "sLW5":
/*!**************************************!*\
  !*** ./src/app/pathFindAlgos/DFS.ts ***!
  \**************************************/
/*! exports provided: DFS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DFS", function() { return DFS; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");

class DFS {
    constructor(grid, graph) {
        this.grid = grid;
        this.graph = graph;
    }
    dfs(s, e) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let stack = [];
            stack.push(s);
            let found = false;
            let path = [];
            while (stack.length > 0) {
                let v = stack.pop();
                let p = this.graph[v].pos;
                path.push(v);
                this.animator(p[0], p[1]);
                yield this.sleep(10);
                if (v == e) {
                    found = true;
                    break;
                }
                if (!this.grid[p[0]][p[1]].visited) {
                    this.grid[p[0]][p[1]].visited = true;
                    this.graph[v].neighbors.forEach((n) => {
                        p = this.graph[n[0]].pos;
                        stack.push(n[0]);
                    });
                }
            }
            if (found) {
                this.clear();
                for (const v of path) {
                    let x = this.graph[v].pos[0];
                    let y = this.graph[v].pos[1];
                    if (this.grid[x][y].type == 'empty' || this.grid[x][y].end) {
                        this.grid[x][y].color = 'yellow';
                        this.grid[x][y].type = 'path';
                        yield this.sleep(20);
                    }
                }
            }
            else {
                confirm('not connected');
            }
        });
    }
    clear() {
        this.grid.forEach((r) => {
            r.forEach((c) => {
                if (c.type == 'visited') {
                    c.color = 'white';
                    c.type = 'empty';
                    c.visited = false;
                    c.end = false;
                }
            });
        });
    }
    animator(x, y) {
        if (this.grid[x][y].type == 'empty') {
            this.grid[x][y].type = 'visited';
            this.grid[x][y].color = '#4d8ab1';
        }
    }
    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}


/***/ }),

/***/ "tGlI":
/*!*******************************************!*\
  !*** ./src/app/mazeAlgos/AldousBroder.ts ***!
  \*******************************************/
/*! exports provided: AldousBroder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AldousBroder", function() { return AldousBroder; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _grid_node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../grid/node */ "VOHP");


class AldousBroder {
    constructor(grid) {
        this.graph = [];
        this.v = 0;
        this.cells = [];
        this.grid = grid;
    }
    init() {
        let id = 0;
        this.graph = [];
        this.grid.forEach((row) => {
            row.forEach((c) => {
                c.color = '#022335';
                c.type = 'wall';
                c.visited = false;
            });
        });
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                this.graph.push(new _grid_node__WEBPACK_IMPORTED_MODULE_1__["Node"](id, [i, j]));
                id++;
            }
        }
        //determine the neighbors as well as the direction of the walls in between
        //each node must be surrounded by walls
        for (let i = 1; i < this.grid.length; i += 2) {
            for (let j = 1; j < this.grid[i].length; j += 2) {
                this.cells.push(this.grid[i][j]);
                this.v++;
                id = this.grid[i][j].id;
                if (j - 2 >= 0) {
                    this.graph[id].setneighbor(this.grid[i][j - 2].id, 1, 1); //west
                }
                if (i - 2 >= 0) {
                    this.graph[id].setneighbor(this.grid[i - 2][j].id, 1, 2); //north
                }
                if (j + 2 < 45) {
                    this.graph[id].setneighbor(this.grid[i][j + 2].id, 1, 3); //east
                }
                if (i + 2 < 19) {
                    this.graph[id].setneighbor(this.grid[i + 2][j].id, 1, 4); //south
                }
            }
        }
    }
    generate() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let current = this.cells[this.rand(this.cells.length)];
            current.visited = true;
            this.v--;
            while (this.v > 0) {
                let n = this.neighbors(current.id);
                let i = this.rand(n.length);
                let x = n[i][0];
                let y = n[i][1];
                let d = n[i][2];
                if (!this.grid[x][y].visited) {
                    current.color = 'white';
                    current.type = 'empty';
                    yield this.sleep(10);
                    let w = this.removeWall(x, y, d);
                    w.color = 'white';
                    w.type = 'empty';
                    yield this.sleep(10);
                    this.grid[x][y].color = 'white';
                    this.grid[x][y].type = 'empty';
                    this.grid[x][y].visited = true;
                    yield this.sleep(10);
                    this.v--;
                }
                current = this.grid[x][y];
            }
        });
    }
    //get the neighbors if any
    neighbors(id) {
        let x, y;
        let ns = [];
        this.graph[id].neighbors.forEach((n) => {
            x = this.graph[n[0]].pos[0];
            y = this.graph[n[0]].pos[1];
            ns.push([x, y, n[2]]);
        });
        return ns;
    }
    //get the wall between the current cell and neighbor based on the direction
    removeWall(x, y, direction) {
        let w;
        if (direction == 1) {
            w = this.grid[x][y + 1];
        }
        else if (direction == 2) {
            w = this.grid[x + 1][y];
        }
        else if (direction == 3) {
            w = this.grid[x][y - 1];
        }
        else if (direction == 4) {
            w = this.grid[x - 1][y];
        }
        return w;
    }
    rand(x) {
        return Math.floor(Math.random() * x);
    }
    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}


/***/ }),

/***/ "ungK":
/*!**********************************************!*\
  !*** ./src/app/services/pathfind.service.ts ***!
  \**********************************************/
/*! exports provided: PathfindService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PathfindService", function() { return PathfindService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _grid_cell__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../grid/cell */ "MOy4");
/* harmony import */ var _pathFindAlgos_Astar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../pathFindAlgos/Astar */ "cYPB");
/* harmony import */ var _globalVar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../globalVar */ "3N5j");
/* harmony import */ var _pathFindAlgos_BFS__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../pathFindAlgos/BFS */ "F18P");
/* harmony import */ var _pathFindAlgos_DFS__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../pathFindAlgos/DFS */ "sLW5");
/* harmony import */ var _pathFindAlgos_UCS__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../pathFindAlgos/UCS */ "MVWA");








class PathfindService {
    constructor(grid) {
        this.graph = [];
        this.grid = grid;
    }
    chooseAlgo(o, graph, s, e) {
        if (_globalVar__WEBPACK_IMPORTED_MODULE_3__["State"].inProgress) {
            return;
        }
        _globalVar__WEBPACK_IMPORTED_MODULE_3__["State"].inProgress = true;
        this.graph = graph;
        let p = this.graph[e].pos;
        this.grid[p[0]][p[1]].end = true;
        this.grid[p[0]][p[1]].color = 'white';
        if (o == 1) {
            this.Astar(s, e);
        }
        else if (o == 2) {
            this.bfs(s, e);
        }
        else if (o == 3) {
            this.dfs(s, e);
        }
        else if (o == 4) {
            this.ucs(s, e);
        }
    }
    Astar(s, e) {
        let astar = new _pathFindAlgos_Astar__WEBPACK_IMPORTED_MODULE_2__["Astar"](this.grid, this.graph);
        astar.Astar(s, e).then(() => {
            _globalVar__WEBPACK_IMPORTED_MODULE_3__["State"].inProgress = false;
        });
    }
    bfs(s, e) {
        let bfs = new _pathFindAlgos_BFS__WEBPACK_IMPORTED_MODULE_4__["BFS"](this.grid, this.graph);
        bfs.bfs(s, e).then(() => {
            _globalVar__WEBPACK_IMPORTED_MODULE_3__["State"].inProgress = false;
        });
    }
    dfs(s, e) {
        let dfs = new _pathFindAlgos_DFS__WEBPACK_IMPORTED_MODULE_5__["DFS"](this.grid, this.graph);
        dfs.dfs(s, e).then(() => {
            _globalVar__WEBPACK_IMPORTED_MODULE_3__["State"].inProgress = false;
        });
    }
    ucs(s, e) {
        let ucs = new _pathFindAlgos_UCS__WEBPACK_IMPORTED_MODULE_6__["UCS"](this.grid, this.graph);
        ucs.UCS(s, e).then(() => {
            _globalVar__WEBPACK_IMPORTED_MODULE_3__["State"].inProgress = false;
        });
    }
}
PathfindService.ɵfac = function PathfindService_Factory(t) { return new (t || PathfindService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_grid_cell__WEBPACK_IMPORTED_MODULE_1__["Cell"])); };
PathfindService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: PathfindService, factory: PathfindService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PathfindService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_grid_cell__WEBPACK_IMPORTED_MODULE_1__["Cell"]]
            }] }]; }, null); })();


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");




const routes = [];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "xVYf":
/*!*******************************************!*\
  !*** ./src/app/services/mazes.service.ts ***!
  \*******************************************/
/*! exports provided: MazesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MazesService", function() { return MazesService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _mazeAlgos_recursiveDiv__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../mazeAlgos/recursiveDiv */ "Eimf");
/* harmony import */ var _mazeAlgos_recursiveBacktracker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../mazeAlgos/recursiveBacktracker */ "XhT1");
/* harmony import */ var _mazeAlgos_primsAlgorithm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../mazeAlgos/primsAlgorithm */ "eD2H");
/* harmony import */ var _mazeAlgos_kruskalsAlgorithm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../mazeAlgos/kruskalsAlgorithm */ "ydtt");
/* harmony import */ var _mazeAlgos_AldousBroder__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../mazeAlgos/AldousBroder */ "tGlI");
/* harmony import */ var _grid_cell__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../grid/cell */ "MOy4");
/* harmony import */ var _globalVar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../globalVar */ "3N5j");










class MazesService {
    constructor(grid) {
        this.grid = grid;
        this.prim = new _mazeAlgos_primsAlgorithm__WEBPACK_IMPORTED_MODULE_3__["randomizedPrim"](grid);
        this.recDiv = new _mazeAlgos_recursiveDiv__WEBPACK_IMPORTED_MODULE_1__["recursiveDivision"](grid);
        this.recB = new _mazeAlgos_recursiveBacktracker__WEBPACK_IMPORTED_MODULE_2__["recBacktracker"](grid);
        this.kruskal = new _mazeAlgos_kruskalsAlgorithm__WEBPACK_IMPORTED_MODULE_4__["randomizedKruskal"](grid);
        this.aldousBroder = new _mazeAlgos_AldousBroder__WEBPACK_IMPORTED_MODULE_5__["AldousBroder"](this.grid);
    }
    mazePicker(option) {
        if (_globalVar__WEBPACK_IMPORTED_MODULE_7__["State"].inProgress || _globalVar__WEBPACK_IMPORTED_MODULE_7__["State"].fightR || _globalVar__WEBPACK_IMPORTED_MODULE_7__["State"].type == 'f') {
            return;
        }
        this.clear();
        _globalVar__WEBPACK_IMPORTED_MODULE_7__["State"].inProgress = true;
        if (option == 1) {
            this.recursiveDivision();
        }
        else if (option == 2) {
            this.backtracker();
        }
        else if (option == 3) {
            this.randKruskal();
        }
        else if (option == 4) {
            this.randPrim();
        }
        else if (option == 5) {
            this.alBroder();
        }
    }
    alBroder() {
        this.aldousBroder.init();
        this.aldousBroder.generate().then(() => {
            _globalVar__WEBPACK_IMPORTED_MODULE_7__["State"].inProgress = false;
        });
    }
    randKruskal() {
        this.kruskal.init();
        this.kruskal.randKruskal().then(() => {
            _globalVar__WEBPACK_IMPORTED_MODULE_7__["State"].inProgress = false;
        });
    }
    backtracker() {
        this.recB.init();
        this.recB.DFS(1, 1).then(() => {
            _globalVar__WEBPACK_IMPORTED_MODULE_7__["State"].inProgress = false;
        });
    }
    randPrim() {
        this.prim.init();
        this.prim.randPrim(1, 1).then(() => {
            _globalVar__WEBPACK_IMPORTED_MODULE_7__["State"].inProgress = false;
        });
    }
    recursiveDivision() {
        this.recDiv.perimeter();
        this.recDiv.recDiv(1, 1, 45 - 2, 19 - 2).then(() => {
            setTimeout(() => {
                _globalVar__WEBPACK_IMPORTED_MODULE_7__["State"].inProgress = false;
            }, 4200);
        });
    }
    clearPathAndPoints() {
        if (_globalVar__WEBPACK_IMPORTED_MODULE_7__["State"].inProgress || _globalVar__WEBPACK_IMPORTED_MODULE_7__["State"].fightR) {
            return;
        }
        _globalVar__WEBPACK_IMPORTED_MODULE_7__["State"].points = [];
        this.grid.forEach((r) => {
            r.forEach((c) => {
                if (c.color == 'yellow' ||
                    c.color == 'blue' ||
                    c.type == 'visited' ||
                    c.color == 'purple' ||
                    c.end) {
                    c.color = 'white';
                    c.type = 'empty';
                    c.visited = false;
                    c.end = false;
                    c.meet = false;
                }
            });
        });
    }
    clearWalls() {
        if (_globalVar__WEBPACK_IMPORTED_MODULE_7__["State"].inProgress || _globalVar__WEBPACK_IMPORTED_MODULE_7__["State"].fightR) {
            return;
        }
        this.grid.forEach((r) => {
            r.forEach((c) => {
                if (c.type == 'wall') {
                    c.color = 'white';
                    c.type = 'empty';
                    c.visited = false;
                    c.end = false;
                    c.meet = false;
                }
            });
        });
    }
    clearPath() {
        if (_globalVar__WEBPACK_IMPORTED_MODULE_7__["State"].inProgress || _globalVar__WEBPACK_IMPORTED_MODULE_7__["State"].fightR) {
            return;
        }
        this.grid.forEach((r) => {
            r.forEach((c) => {
                if (c.color == 'yellow' && !c.end) {
                    c.color = 'white';
                    c.type = 'empty';
                }
                else if (c.end && c.meet) {
                    c.color = 'white';
                    c.type = 'empty';
                }
                else if (c.end) {
                    c.color = 'blue';
                    c.type = 'start';
                }
                c.end = false;
                c.visited = false;
                c.meet = false;
            });
        });
    }
    clear() {
        if (_globalVar__WEBPACK_IMPORTED_MODULE_7__["State"].inProgress || _globalVar__WEBPACK_IMPORTED_MODULE_7__["State"].fightR) {
            return;
        }
        _globalVar__WEBPACK_IMPORTED_MODULE_7__["State"].points = [];
        this.grid.forEach((r) => {
            r.forEach((c) => {
                c.color = 'white';
                c.type = 'empty';
                c.visited = false;
                c.end = false;
                c.meet = false;
            });
        });
    }
}
MazesService.ɵfac = function MazesService_Factory(t) { return new (t || MazesService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_grid_cell__WEBPACK_IMPORTED_MODULE_6__["Cell"])); };
MazesService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: MazesService, factory: MazesService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MazesService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_grid_cell__WEBPACK_IMPORTED_MODULE_6__["Cell"]]
            }] }]; }, null); })();


/***/ }),

/***/ "ydtt":
/*!************************************************!*\
  !*** ./src/app/mazeAlgos/kruskalsAlgorithm.ts ***!
  \************************************************/
/*! exports provided: randomizedKruskal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomizedKruskal", function() { return randomizedKruskal; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _grid_node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../grid/node */ "VOHP");
/* harmony import */ var _edge__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edge */ "ISgX");
/* harmony import */ var dsforest__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dsforest */ "Pyyz");
/* harmony import */ var dsforest__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(dsforest__WEBPACK_IMPORTED_MODULE_3__);




class randomizedKruskal {
    constructor(grid) {
        this.graph = [];
        this.grid = grid;
    }
    init() {
        let id = 0;
        this.graph = [];
        this.grid.forEach((row) => {
            row.forEach((c) => {
                c.color = '#022335';
                c.type = 'wall';
                c.visited = false;
            });
        });
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                this.graph.push(new _grid_node__WEBPACK_IMPORTED_MODULE_1__["Node"](id, [i, j]));
                id++;
            }
        }
        //determine the neighbors as well as the direction of the walls in between
        //each node must be surrounded by walls
        for (let i = 1; i < this.grid.length; i += 2) {
            for (let j = 1; j < this.grid[i].length; j += 2) {
                id = this.grid[i][j].id;
                if (j - 2 >= 0) {
                    this.graph[id].setneighbor(this.grid[i][j - 2].id, 1, 1); //west
                }
                if (i - 2 >= 0) {
                    this.graph[id].setneighbor(this.grid[i - 2][j].id, 1, 2); //north
                }
                if (j + 2 < 45) {
                    this.graph[id].setneighbor(this.grid[i][j + 2].id, 1, 3); //east
                }
                if (i + 2 < 19) {
                    this.graph[id].setneighbor(this.grid[i + 2][j].id, 1, 4); //south
                }
            }
        }
    }
    randKruskal() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            //set with all edges in the graph
            const edges = new Set();
            //subsets that consist of each node at first
            const buckets = new dsforest__WEBPACK_IMPORTED_MODULE_3__["DisjointSet"]();
            //for each node we create two edges that connect it to
            //the neighhbor to the right and bellow
            for (let i = 1; i < this.grid.length; i += 2) {
                for (let j = 1; j < this.grid[i].length - 1; j += 2) {
                    buckets.makeSet(this.grid[i][j].id);
                    if (i + 2 < 19) {
                        edges.add(new _edge__WEBPACK_IMPORTED_MODULE_2__["Edge"](this.grid[i][j], this.grid[i + 2][j]));
                    }
                    if (j + 2 < 45) {
                        edges.add(new _edge__WEBPACK_IMPORTED_MODULE_2__["Edge"](this.grid[i][j], this.grid[i][j + 2]));
                    }
                }
            }
            while (edges.size > 0) {
                //pull out a random edge s----e
                let edge = this.getRandomEdge(edges);
                edges.delete(edge);
                //check if the edge connects two disjoint subsets
                //if yes, merge the subsets and connect the cells
                if (!buckets.areConnected(edge.s.id, edge.e.id)) {
                    buckets.union(edge.s.id, edge.e.id);
                    edge.s.color = 'white';
                    edge.s.type = 'empty';
                    yield this.sleep(20);
                    edge.e.color = 'white';
                    edge.e.type = 'empty';
                    yield this.sleep(20);
                    this.carve(edge.s.id, edge.e.id);
                    yield this.sleep(20);
                }
            }
        });
    }
    //carve the passage
    carve(id1, id2) {
        let pos1 = this.graph[id1].pos;
        let pos2 = this.graph[id2].pos;
        if (pos2[0] > pos1[0]) {
            //wall below s
            this.grid[pos1[0] + 1][pos1[1]].color = 'white';
            this.grid[pos1[0] + 1][pos1[1]].type = 'empty';
        }
        else if (pos2[1] > pos1[1]) {
            //wall to the right
            this.grid[pos1[0]][pos1[1] + 1].color = 'white';
            this.grid[pos1[0]][pos1[1] + 1].type = 'empty';
        }
    }
    // get a random edge from the set
    getRandomEdge(set) {
        let index = this.rand(set.size);
        let cntr = 0;
        for (let key of set.keys()) {
            if (cntr++ === index) {
                return key;
            }
        }
    }
    rand(x) {
        return Math.floor(Math.random() * x);
    }
    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "AytR");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map