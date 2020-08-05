<template>
  <div id="app">
    <div style="height: 50px;display: flex;justify-content: center;align-items: center">
      工具区域
    </div>

    <!--//@click.self="onDeactivated"-->

    <div style="display: flex;height: calc(100vh - 70px)">

      <div  style="width: 300px;height: 100%;background: #61dde9">
        左侧菜单
      </div>

      <div id="vueDragSelect" style=";height: 100%; background: aliceblue;overflow: auto">

        <vue-ruler-tool
          v-model="presetLine"
          :is-scale-revise="true"
          :line-reference="true"
          style="height: 820px; width: 2020px;"
        >

          <div style="height: 800px; width: 2000px; border: 1px solid red; position: relative;">

            <vue-drag-select @onDeactivated="onDeactivated"  @currentActiveValue="currentActiveValue">
              <VueDargDesign
                :w="item.style.w"
                :h="item.style.h"
                :x="item.style.x"
                :y="item.style.y"
                :snap="true"
                :active="item.active"
                @refLineParams="getRefLineParams"
                v-for="(item,index) in rightComps"
                :key="index"
                @dragging="onDrag"
                @resizing="onResize"
                :prevent-deactivation="true"
                @activated="onActivated(item,index)"
                :parent="true"
              >
                <drag-select-option  :key="item.id" :value="item" :item-index="index">
                  <div style="width: 100%;height: 100%"
                       @contextmenu.prevent="contextmenuOpen($event,item,index)">
                    <div style="width: 100%;height: 100%;user-select: none">
                      {{item.id}}
                    </div>
                  </div>
                </drag-select-option>
              </VueDargDesign>
              <!--辅助线-->
              <span class="ref-line v-line"
                    v-for="item in vLine"
                    :key="item.id"
                    v-show="item.display"
                    :style="{ left: item.position, top: item.origin, height: item.lineLength}"
              />
              <span class="ref-line h-line"
                    v-for="item in hLine"
                    :key="item.id"
                    v-show="item.display"
                    :style="{ top: item.position, left: item.origin, width: item.lineLength}"
              />
            </vue-drag-select>


          </div>

        </vue-ruler-tool>

      </div>

      <div  style="width: 300px;height: 100%;background: #969696">
        配置区域
      </div>
    </div>



  </div>
</template>

<script>



  //  import VueRulerTool from 'vue-ruler-tool'
  export default {
    name: 'app',
    data () {
      return {
        presetLine: [{ type: 'h', site: 100 }, { type: 'v', site: 100 }],
        menuPosition: {}, // 右键菜单
        menuData: [],
        rightComps: [
          {
            "id": "9e69f6ae-46ec-8d9a-545c-21afdf81ceb1",
            "style": {
              "x": 225,
              "y": 106,
              "w": 200,
              "h": 50
            },
            "active": true,
          }, {
            "id": "9e69f6ae-46ec-8d9a-545c-21afdf81c333",
            "style": {
              "x": 525,
              "y": 136,
              "w": 407,
              "h": 50
            },
            "active": false,
          }],
        currentModel: {
          style: {}
        },
        vLine: [],
        hLine: []
      }
    },
    mounted(){

//      let params=[
//        { type: 'l', site: 100 },
//        { type: 'v', site: 200 }
//      ]
//      this.$refs.rulerTool.quickGeneration(params)

//      window.addEventListener('scroll', this.handleScroll, true)

    },
    methods: {
//      handleScroll() {
//        var scrollT = this.$refs.vueDragSelect.scrollLeft;
//        console.log(scrollT);
//
//      },



      currentActiveValue(currentActive){
        console.log(currentActive);
      },


      onActivated(item, index){
        this.rightComps.map(ele => {
          ele.active = false;
        });
        item.active = true;
        item.index = index
        this.currentModel = item;


      },

      onDeactivated(e){
        this.rightComps.map(ele => {
          ele.active = false;
        });
        this.currentModel = {}
        this.menuPosition.display = 'none';

        this.currentModel.style = {};
      },

      onDrag(x, y){
        this.currentModel.style.x = x;
        this.currentModel.style.y = y;
      },

      onResize(x, y, width, height){
        this.currentModel.style.x = x;
        this.currentModel.style.y = y;
        this.currentModel.style.w = width;
        this.currentModel.style.h = height;
      },

      // 右键删除
      menuDelete(index){

        if (!index) {
          this.rightComps.splice(this.currentModel.index, 1);
        } else {
          this.rightComps.splice(this.menuPosition.index, 1);
        }
        this.menuPosition.display = 'none';
      },
      menuHidden(){
        this.viewGroup.active = false;
        this.rightComps.map(ele => {
          ele.active = false;
        });
        this.menuPosition.display = 'none';
      },
      // 辅助线回调事件
      getRefLineParams(params){
        const {vLine, hLine} = params;
        this.vLine = vLine;
        this.hLine = hLine;
      },
    }
  };
</script>

<style>

  .test1 {
    background-color: rgb(239, 154, 154);
  }

  .test2 {
    background-color: rgb(129, 212, 250);
  }

  .test3 {
    background-color: rgb(174, 213, 129);
  }
</style>
