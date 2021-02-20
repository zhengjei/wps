 <form class="layui-form" action="">
        <div id="app-4" style="margin-top: 1%;">
            <ol>
                <li v-for="todo in todos">
                    <div class="layui-form-item" style="float: left;margin-left:1%">
                        <label style="padding:9px 15px;float:left">{{todo.title}}</label>
                        <div class="layui-input-inline" style="width:20%;">
                            <select name="city">
                                <option value=""></option>
                                <option value="0">小于</option>
                                <option value="1">大于</option>
                                <option value="2">等于</option>
                            </select>
                        </div>
                        <div class="layui-input-inline" style="width:40%">
                            <input type="text" name="title" placeholder="请输入值" autocomplete="off" class="layui-input">

                        </div>
                        <input type="checkbox" name="zzz" lay-skin="switch" lay-text="显示|不显示">
                    </div>
                </li>
            </ol>
        </div>
        <div class="layui-form" align="right" style="margin-right:5%">
            <button class="layui-btn layui-btn" lay-submit lay-filter="formDemo">确定</button>
        </div>
    </form>

