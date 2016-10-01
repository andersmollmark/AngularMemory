(function () {
    'use strict';

    angular
        .module('angularMemoryApp')
        .controller('MemoryController', MemoryController);

    MemoryController.$inject = ['$timeout'];

    function MemoryController($timeout) {
        /* jshint validthis: true */
        var self = this;

        self.allBtns = [];

        var numberOfDifferentPics = 8;
        var numberOfPics = numberOfDifferentPics * 2;
        var numberOfRowsAndCols = numberOfDifferentPics / 2;

        var privateAPI = {
            pressedBtn: {name: undefined},
            checking: {name: undefined},
            foundBoth: {},
            foundPics: 0,
            addBtns: _addBtns,
            createMatrix: _createMatrix,
            isAlreadyPressed: _isAlreadyPressed,
            waitForTimeout: false
        };

        self.clicks = 0;
        if(!localStorage.topscore){
            localStorage.topscore = 1000;
        }
        self.topscore = parseInt(localStorage.topscore);
        self.foundBoth = foundBoth;
        self.toggleBtn = toggleBtn;
        self.showMe = showMe;
        self.isBtnDisabled = isBtnDisabled;
        self.isDone = false;



        privateAPI.addBtns();
        privateAPI.createMatrix();


        function showMe(nameOfBtn, btnId){
            return self.foundBoth(nameOfBtn) ||
            (nameOfBtn === privateAPI.pressedBtn.name && btnId === privateAPI.pressedBtn.btnId) ||
                (nameOfBtn === privateAPI.checking.name && btnId === privateAPI.checking.btnId);
        }

        function isBtnDisabled(nameOfBtn, btnId){
            return self.foundBoth(nameOfBtn) || privateAPI.isAlreadyPressed(nameOfBtn, btnId);
        }

        function _isAlreadyPressed(nameOfBtn, btnId){
            nameOfBtn === privateAPI.pressedBtn.name && btnId === privateAPI.pressedBtn.btnId;
        }

        function foundBoth(nameOfBtn){
            return privateAPI.foundBoth[nameOfBtn] && privateAPI.foundBoth[nameOfBtn] === true;
        }

        function toggleBtn(nameOfBtn, btnId){
            if(privateAPI.waitForTimeout){
                return;
            }
            if(nameOfBtn === privateAPI.checking.name && btnId === privateAPI.checking.btnId){
                return;
            }
            self.clicks++;
            privateAPI.checking.name = nameOfBtn;
            privateAPI.checking.btnId = btnId;
            if(angular.isUndefined(privateAPI.pressedBtn.name)){
                privateAPI.pressedBtn.name = nameOfBtn;
                privateAPI.pressedBtn.btnId = btnId;
            }
            else if(nameOfBtn === privateAPI.pressedBtn.name && btnId !== privateAPI.pressedBtn.btnId){
                privateAPI.foundBoth[nameOfBtn] = true;
                privateAPI.foundPics++;
                privateAPI.pressedBtn.name = undefined;
                privateAPI.pressedBtn.btnId = undefined;
                if(privateAPI.foundPics === numberOfDifferentPics){
                    self.isDone = true;
                    if(self.clicks < self.topscore){
                        alert("grattis, du slog rekordet!");
                        self.topscore = self.clicks;
                    }
                }
            }
            else{
                privateAPI.waitForTimeout = true;
                $timeout(function () {
                    privateAPI.pressedBtn.name = undefined;
                    privateAPI.pressedBtn.btnId = undefined;
                    privateAPI.checking.name = undefined;
                    privateAPI.checking.btnId = undefined;
                    privateAPI.waitForTimeout = false;
                }, 1000);
            }

        }

        function _addBtns() {
            var numberArr = [];
            for (var i = 0; i < 16; i++) {
                numberArr.push(i);
            }

            var imgNum = 1;
            var oneAdded = false;
            for (var j = 0; j < numberOfPics; j++) {
                var pos = numberArr.splice(Math.random() * numberArr.length, 1);
                self.allBtns.splice(pos, 0, {id: j, imgName: 'images/rolig' + imgNum + '.jpeg'});
                if (oneAdded) {
                    imgNum++;
                }
                oneAdded = !oneAdded;

            }

        }

        function _createMatrix() {
            self.rows = [];
            var btnIndex = 0;
            for (var row = 0; row < numberOfRowsAndCols; row++) {
                var aCol = [];
                for (var col = 0; col < numberOfRowsAndCols; col++) {
                    aCol.push(self.allBtns[btnIndex++]);
                }
                self.rows.push(aCol);
            }
        }


    }
})();
