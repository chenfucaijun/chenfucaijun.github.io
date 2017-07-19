(function ($) {
  $.fn.doquestion = function (question_data) {
    
    
    console.log(22222);
    var defaults = {
      questions: null,
      startImg: 'images/start.gif'
    };
    
    // var json_str= '{"id":"1","title":"计算机网络试题","introduction":"本套测试题5道题，3道选择题，2道判断题","user_create_id":"25","user_edit_id":"25","content":{"questions":{"unchoices":[{"q":"计算机网络中五层协议的体系结构包括如下：","a":["物理层","数据链路层","网络层","运输层","会话层"],"ta":["1","1","1","1","1"]},{"q":"数据链路层的作用包括:","a":["物理地址寻址","拥塞控制","数据的成帧","流量控制","数据的检错"],"ta":["1","1","1","0","1"]},{"q":"IP 地址的分类有","a":["B类地址：以0开头","B类地址：以10开头","C类地址：以110开头","C类地址：以1110开头"],"ta":["0","1","1","0"]}],"tf":[{"q":"RIP协议是一种路由选择协议","a":["正确","错误"],"ta":"1"},{"q":"UDP是面向连接的，不可靠的数据报服务","a":["正确","错误"],"ta":"0"}]}},"created_at":"2016-10-10 16:04:10","updated_at":"2016-10-10 16:04:10","deleted_at":null}';
    
    var question_data = JSON.parse(question_data);
    
    
    
    //初始化数据
    var config = $.extend(defaults, question_data['content']);
    
    // TODO:单选题配置
    var choices = config.questions.choices;
    
    // TODO:多选题配置
    var mchoices = config.questions.mchoices;
    
    //不定项题目
    var unchoices = config.questions.unchoices;
    
    // 判断题数据
    var tf = config.questions.tf;
    
    if (choices == undefined) {
      choices = '';
    }
    if (mchoices == undefined) {
      mchoices = '';
    }
    if (tf == undefined) {
      tf = '';
    }
    if (unchoices == undefined) {
      unchoices = '';
    }
    
    var qNum = choices.length + mchoices.length + unchoices.length + tf.length;
    
    if (config.questions == null) {
      $(this).html('<div class="intro-container"><h2 class="qTitle">Failed to parse questions.</h2></div>');
    }
    
    //定义一个父容器对象,
    var superContainer = $(this),
        
        progressContent,
        questionTitle,
        questionContent,
        answers,
        
        choicesContent = '',
        mchoicesContent = '',
        unchoicesContent = '',
        tfContent = '',
        
        nextAndLastButton,
        selectQustionCard = '',
        questionNum = 0,
        currentQuestionNum = 1,
        allQuestionNum = choices.length + mchoices.length + unchoices.length + tf.length,
        divRightContent = '',
        dataType = 2;
    
    
    // 进度条
    progressContent = '<div class="div-progress"> <div class="q-progress"> <div class="q-progress-bar"> </div> </div> <div class="q-num">1/' + qNum + '</div> <div class="q-time"> <span class="q-time-content">00:00:00</span> </div> </div>';
    
    // 题型提示
    questionTitle = ' <div class="question-title"> <span class="fui-new"></span> <span class="question-title-content">不定项选择题</span> </div>';
    
    //下一题上一题按钮
    nextAndLastButton = '<div class="div-next"> <button class="btn btn-warning q-submit-early">提前交卷</button> <button class="btn btn-success q-next">下一步</button> </div>';
    
    //所有题目区域初始化
    questionContent = '<div class="subject-main">';
    
    //单选题内容
    // if (choices != null && choices != undefined) {
    if (!choices) {
      for (var questionsIteratorIndex = 0; questionsIteratorIndex < choices.length; questionsIteratorIndex++) {
        choicesContent += ' <div class="q-and-n"> <div class="div-question" data-t="0">';
        choicesContent += '<div class="question-content">' + choices[questionsIteratorIndex].q + '</div>';
        for (var i = 0; i < choices[questionsIteratorIndex].a.length; i++) {
          choicesContent += ' <div class="question-option"> <span class="option-icons"></span>';
          choicesContent += choices[questionsIteratorIndex].a[i];
          choicesContent += '</div>';
        }
        choicesContent += '</div>' + nextAndLastButton + '</div></div>';
      }
    }
    
    
    //多选题内容
    if (mchoices != null && mchoices != undefined) {
      // if (!mchoices) {
      for (var questionsIteratorIndex = 0; questionsIteratorIndex < mchoices.length; questionsIteratorIndex++) {
        mchoicesContent += ' <div class="q-and-n"> <div class="div-question" data-t="1">';
        mchoicesContent += '<div class="question-content">' + mchoices[questionsIteratorIndex].q + '</div>';
        for (var i = 0; i < unchoices[questionsIteratorIndex].a.length; i++) {
          mchoicesContent += ' <div class="question-option"> <span class="option-icons"></span>';
          mchoicesContent += mchoices[questionsIteratorIndex].a[i];
          mchoicesContent += '</div>';
        }
        mchoicesContent += '</div>' + nextAndLastButton + '</div>';
      }
    }
    
    //不定项选择题
    if (unchoices != null && unchoices != undefined) {
      // if (!unchoices) {
      for (var questionsIteratorIndex = 0; questionsIteratorIndex < unchoices.length; questionsIteratorIndex++) {
        unchoicesContent += ' <div class="q-and-n"><div class="div-question" data-t="2">';
        unchoicesContent += '<div class="question-content">' + unchoices[questionsIteratorIndex].q + '</div>';
        for (var i = 0; i < unchoices[questionsIteratorIndex].a.length; i++) {
          unchoicesContent += ' <div class="question-option"> <span class="option-icons"></span>';
          unchoicesContent += unchoices[questionsIteratorIndex].a[i];
          unchoicesContent += '</div>';
        }
        unchoicesContent += '</div>' + nextAndLastButton + '</div>';
      }
      
    }
    
    
    //判断题内容
    if (tf != null && tf != undefined) {
      // if (!tf) {
      for (var questionsIteratorIndex = 0; questionsIteratorIndex < tf.length; questionsIteratorIndex++) {
        tfContent += ' <div class="q-and-n"><div class="div-question" data-t="3">';
        tfContent += '<div class="question-content">' + tf[questionsIteratorIndex].q + '</div>';
        for (var i = 0; i < tf[questionsIteratorIndex].a.length; i++) {
          tfContent += ' <div class="question-option"> <span class="option-icons"></span>';
          tfContent += tf[questionsIteratorIndex].a[i];
          tfContent += '</div>';
        }
        tfContent += '</div>' + nextAndLastButton + '</div>';
      }
    }
    
    
    //所有题目区域
    questionContent += choicesContent + mchoicesContent + unchoicesContent + tfContent + '';
    

    
    //右边提示区域
    divRightContent += ' <div class="div-right"><div class="div-paper-info"> <p class="qpaper-name">信息安全测试题</p> <p class="qpaper-info">出题单位：CUC信安实验室</p> </div>';
    
    
    //选题卡区域
    selectQustionCard += ' <div class="div-choose-card"> <p>选择题目</p><ul class="answer-sheet-num clearfix">';
    
    for (var i = 0; i < qNum; i++) {
      selectQustionCard += '<li><a href="javascript:void(0);" target="_blank" rel="external">' + (++questionNum) + '</a></li>';
    }
    selectQustionCard += '</ul> </div>';
    
    //右边提示区域
    divRightContent += selectQustionCard + '</div>';
    
    
    //问题区域
    var divMain = ' <div class="div-main">' + progressContent + questionTitle + questionContent + '</div>';
    
    
    //添加一个边框,
    superContainer.addClass('div-main-container');
    
    //初始化完毕
    superContainer.html(divMain );
    superContainer.append(divRightContent);
   
    //添加模态框提示
    superContainer.after('<div class="modal fade" id="submitModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-body">                    你确定要交卷吗?</div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">取消</button><button type="button" class="btn btn-primary final_submit_button" data-dismiss="modal" onclick="$().saveAndScore(question_data)">                        确定</button></div></div></div></div><div class="modal fade" id="timeDeadModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-body">                    请快点答题哦，不然要自动交卷咯</div><div class="modal-footer"><button type="button" class="btn btn-primary" data-dismiss="modal">                        确定</button></div></div></div></div>');
    
    
    
    //初始化标题与简介
    $('.qpaper-name').text(question_data['title']);
    $('.qpaper-info').text(question_data['introduction']);
    
    
    //初始化进度条
    var progress = superContainer.find('.q-progress'),
        progressKeeper = superContainer.find('.q-progress-bar');
    
    
    //时间秒数格式化q-
    function arrive_timer_format(s) {
      var t, hour, min, sec;
      if (s > -1) {
        hour = Math.floor(s / 3600);
        min = Math.floor(s / 60) % 60;
        sec = s % 60;
        if (hour < 10) {
          hour = '0' + hour;
        }
        if (min < 10) {
          min = '0' + min;
        }
        if (sec < 10) {
          sec = '0' + sec;
        }
        t = hour + ':' + min + ':' + sec;
      }
      return t;
    }
    
    //计数器显示时间
    var start = new Date;
    
    setInterval(function () {
      $('.q-time-content').text(arrive_timer_format(Math.ceil((new Date - start) / 1000)));
    }, 1000);
    
    
    //如果是最后一题,设置下一步按钮的样式
    //完成交卷
    var submitContent = '<button class="btn btn-info q-submit-finally">完成交卷</button>';
    $('.div-next').last().html(submitContent);
    
    //设置初始的进度条状态长度
    var perProgressWidth = Math.ceil(progress.width() / allQuestionNum);
    progressKeeper.width(perProgressWidth);
    
    
    //隐藏题目：第一题以外的所有题目
    var questionList = superContainer.find(".subject-main");
    questionList.find('.q-and-n').hide().first().fadeIn(500);
    
    //设置选项选中和非选中状态(单选和判断,多选)
    superContainer.find('.question-option').on("click", function (e) {
      //判断类型
      var dataType = $(this).parents('.div-question').attr('data-t');
      
      //单选和判断
      if (dataType == 0 || dataType == 3) {
        if ($(this).hasClass('selected') == false) {
          $(this).siblings('.question-option').removeClass('selected');
          $(this).siblings('.question-option').find('.option-icons').removeClass('selected');
          $(this).addClass('selected');
          $(this).find('.option-icons').addClass('selected');
        }
        //多选
      } else if (dataType == 1) {
        var thisRadio = $(this).find('input');
        
        //如果点击的区域是input按钮或者pre标签
        if (e.target == $(this).find('input')[0]) {
          if (thisRadio.attr('checked')) {
            thisRadio.attr('checked', false);
            thisRadio.parent('label').removeClass('checked');
          } else {
            thisRadio.attr('checked', true);
            thisRadio.parent('label').addClass('checked');
          }
          //如果点击的是整个subject-option区域
        } else if (e.target == $(this)[0]) {
          
          if (thisRadio.attr('checked')) {
            thisRadio.attr('checked', false);
            thisRadio.parent('label').removeClass('checked');
          } else {
            thisRadio.attr('checked', true);
            thisRadio.parent('label').addClass('checked');
          }
        }
        
        //不定项
      } else if (dataType == 2) {
        if ($(this).hasClass('selected') == false) {
          $(this).addClass('selected');
          $(this).find('.option-icons').addClass('selected');
        } else {
          $(this).removeClass('selected');
          $(this).find('.option-icons').removeClass('selected');
        }
      }
    });
    
    
    // 根据题号给出题型提示
    function numToType(data) {
      if (data == 0) {
        return "单选题";
      } else if (data == 1) {
        return "多选题";
      } else if (data == 2) {
        return "不定项选择题";
      } else if (data == 3) {
        return "判断题";
      }
    }
    
    
    //下一题按钮
    superContainer.find('.q-next').on("click", function () {
      
      //跳到下一题,寻找display:block显示div的下一个
      $(this).parents('.q-and-n').fadeOut(200, function () {
        $(this).next().fadeIn(200);
      });
      
      //进度条变化
      
      progressKeeper.animate({
            width: progressKeeper.width() + perProgressWidth
          },
          200);
      
      //答题卡变化
      $('.answer-sheet-num').find('li').find('a').removeClass('answering-num');
      $('.answer-sheet-num').find('li').find('a').eq(currentQuestionNum).addClass("answering-num answering-done")
      
      //题号变化
      $('.q-num').text(++currentQuestionNum + '/' + allQuestionNum);
      
      
      //根据题号给出题型提示
      $(".question-title-content").text(numToType($(this).parents('.subject-main').find('.div-question').attr('data-t')));
      
      
      return false;
      
    });
    
    
    //答题卡的选中变色 and switch the question content.
    $('.answer-sheet-num').find('li').on('click', function () {
      $(this).siblings('li').find('a').removeClass('answering-num');
      $(this).find('a').addClass("answering-num answering-done");
      
      //获取点击的题目题号
      var num = $(this).find('a').text();
      
      
      //设置进度条
      progressKeeper.animate({
            width: perProgressWidth * num
          },
          500);
      
      $(".q-num").text(num + '/' + allQuestionNum);
      //当前题目消失,选择的题目出现
      var temp = currentQuestionNum;
      // use stop function to clear animate queue and jump to the end
      $('.div-main').find('.q-and-n').eq(temp - 1).stop(true, true).fadeOut(200, function () {
        $('.div-main').find('.q-and-n').eq(num - 1).fadeIn(200);
      });
      
      //当前题目数量
      currentQuestionNum = num;
      
      //根据题号给出题型提示
      dataType = $('.q-and-n').eq(num - 1).find('.div-question').attr('data-t');
      
      $(".question-title-content").text(numToType(dataType));
      
      
    });
    
    
    //点击暂停或者播放
    
    
    //点击提前提交或完成交卷
    $('.q-submit-early').on('click', function () {
      $('#submitModal').modal();
    });
    
    $('.q-submit-finally').on('click', function () {
      $('#submitModal').modal();
    });
    
    
    //保存用户做完之后的试题以及答案
    var save_paper_answer = function (json_data) {
      
      
      //ajax传的是json对象，所以要将json字符串转成json对象
      var a = JSON.parse(json_data);
      console.log("---a:");
      console.dir(a);
//            var mooe = window.location.host; //全局url
      
      //进行ajax传数据
      console.log("保存试题！");
      
      $.ajax({
        type: "POST",
        url: "/question/saveanswers",
        dataType: "json",
        data: a,
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function (res) {
          console.log("接受成功res为：");
          console.log(res);
          window.location.replace("/question/showresult/" + res);
        },
        error: function (err) {
          console.info(err);
        }
        
      });
      
    }
    
  };
  
  
  function save_paper_answer(json_data) {
    
    
    //ajax传的是json对象，所以要将json字符串转成json对象
    var a = JSON.parse(json_data);
    console.log("---a:");
    console.dir(a);
//            var mooe = window.location.host; //全局url
    
    //进行ajax传数据
    console.log("保存试题！");
    
    $.ajax({
      type: "POST",
      url: "/question/saveanswers",
      dataType: "json",
      data: a,
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      success: function (res) {
        console.log("接受成功res为：");
        console.log(res);
        window.location.replace("/question/showresult/" + res);
      },
      error: function (err) {
        console.info(err);
      }
      
    });
    
  }
  
  
  //简答的前端比对在线判题，理应将答案传递到服务器端进行后端判题
  $.fn.saveAndScore = function (question_data) {
    
    
    //对象拷贝方法
    function cloneObj(oldObj) {
      if (typeof(oldObj) != 'object') {
        return oldObj;
      } else if (oldObj == null) {
        return oldObj;
      } else {
        var newObj = new Object();
        for (var i in oldObj) {
          newObj[i] = cloneObj(oldObj[i]);
        }
        return newObj;
      }
      
    }
    
    //对象转数组方法
    function objToArr(obj) {
      var arr = [];
      for (var i in obj) {
        arr.push(obj[i]);
      }
      return arr;
    }
    
    
    //获取选择的内容，封装json串
    var original_question_data = JSON.parse(question_data);
    
    var questionObj = new Object();
    
    var choices_arr = new Array();
    var tf_arr = new Array();
    
    //遍历选择题
    $(".div-question[data-t='2']").each(function (index) {
      var question = new Object();
      //问题内容
      question['q'] = $(this).find(".question-content").text();
      
      //选项内容
      //获取选择的答案
      var option_arr = new Object();
      $(this).find(".question-option").each(function () {
        var trim_text = $(this).text().replace(/(^\s*)|(\s*$)/g, "");
        if ($(this).hasClass('selected')) {
          option_arr[trim_text] = 1;
        } else {
          option_arr[trim_text] = 0;
        }
      });
      
      question['option'] = option_arr;
      
      choices_arr[index] = question;
    });
    
    
    //计算正确题数和错误题数
    var true_question_num = 0;
    var total_question_num = 0;
    
    
    //遍历判断题
    $(".div-question[data-t='3']").each(function (index) {
      var question = new Object();
      //问题内容
      var answer = new Array();
      question['q'] = $(this).find(".question-content").text();
      
      //选项内容
      var nIndex = null;
      $(this).find(".question-option").each(function (index2) {
        if ($(this).hasClass('selected')) {
          if (index2 == 0) {
            nIndex = true;
          }
          if (index2 == 1) {
            nIndex = false;
          }
        } else {
        
        }
      });
      question['answer'] = nIndex;
      tf_arr[index] = question;
      
    });
    
    //封装到对象中去
    questionObj['unchoices'] = choices_arr;
    questionObj['tf'] = tf_arr;
    
    // 包含全部内容，转json字符串
    var question_data = new Object();
    question_data['questions'] = questionObj;
    
    var obj = new Object();
    obj['title'] = $('.qpaper-name').text();
    obj['introduction'] = $('.qpaper-info').text();
    obj['content'] = question_data;
    obj['question_id'] = $('.question_id').val();
    obj['time'] = $('.q-time-content').text();
    obj['do_id'] = $('.do_id').val();
    
    var jsonText = JSON.stringify(obj);
    
    /**可以传递这个对象到后端进行服务器端的判题
     传递到服务器端的ajax实例代码如上面的函数save_paper_answer
     由于是公开Demo，将演示题目判题部分，所以进行简单的前端判题
     **/
    
    //在线判题
    console.log("-------json question and user answer content------------");
    console.log(jsonText);
    console.log(original_question_data.content.questions.unchoices[0]);
    
    
    var user_answer_status = [];
    var qtf = 1;
    //遍历不定项选择题
    for (var unchoice_answer_index = 0; unchoice_answer_index < obj.content.questions.unchoices.length; unchoice_answer_index++) {
      var obj_answer_unchoice = obj.content.questions.unchoices;
      var ta_index = 0;
      /**  style  user_answer   true_answer
       0             1          1
       1             1          0
       2             0          1
       3             0          0
       */
      
      for (var answer_key_unchoice  in obj_answer_unchoice[unchoice_answer_index].option) {
        
        var answer_temp = obj_answer_unchoice[unchoice_answer_index].option[answer_key_unchoice];
        if (answer_temp == original_question_data.content.questions.unchoices[unchoice_answer_index].ta[ta_index] == 1) {
          user_answer_status[ta_index] = 0;
        } else if (answer_temp == original_question_data.content.questions.unchoices[unchoice_answer_index].ta[ta_index] == 0) {
          user_answer_status[ta_index] = 3;
          qtf = 0;
        } else if (answer_temp == 1 && original_question_data.content.questions.unchoices[unchoice_answer_index].ta[ta_index] == 0) {
          user_answer_status[ta_index] = 2;
          qtf = 0;
        } else {
          user_answer_status[ta_index] = 1;
          qtf = 0;
        }
        ta_index++;
      }
      
      var true_flag = true;
      for (var answer_status_key in  user_answer_status) {
        if (user_answer_status[answer_status_key] != 0) {
          true_flag = false;
          break;
        }
      }
      //正确则添加
      if (true_flag) {
        true_question_num++;
      }
      
      obj_answer_unchoice[unchoice_answer_index].ar = objToArr(cloneObj(user_answer_status));
      obj_answer_unchoice[unchoice_answer_index].qtf = cloneObj(qtf);
    }
    
    
    var user_answer_status = [];
    var qtf = 0;
    //遍历判断题
    for (var tf_answer_index = 0; tf_answer_index < obj.content.questions.tf.length; tf_answer_index++) {
      var obj_answer_tf = obj.content.questions.tf;
      
      /**  style  user_answer   true_answer
       0             1        1
       1             1        0
       2             0        1
       3             0        0
       4                      1
       5                      0
       */
      
      if (obj_answer_tf[tf_answer_index].answer == null) {
        
        if (original_question_data.content.questions.tf[tf_answer_index].ta == 1) {
          user_answer_status[0] = 4;
          
          
        } else if (original_question_data.content.questions.tf[tf_answer_index].ta == 0) {
          user_answer_status[0] = 5;
          
        }
        
      } else if (obj_answer_tf[tf_answer_index].answer == true) {
        if (original_question_data.content.questions.tf[tf_answer_index].ta == 1) {
          user_answer_status[0] = 0;
          qtf = 1;
          
        } else if (original_question_data.content.questions.tf[tf_answer_index].ta == 0) {
          
          user_answer_status[0] = 1;
          
        }
        
      } else if (obj_answer_tf[tf_answer_index].answer == false) {
        if (original_question_data.content.questions.tf[tf_answer_index].ta == 1) {
          user_answer_status[0] = 2;
          
        } else if (original_question_data.content.questions.tf[tf_answer_index].ta == 0) {
          
          user_answer_status[0] = 3;
          
        }
        
      }
      
      if (user_answer_status[0] == 0 || user_answer_status[0] == 3) {
        true_question_num++;
      }
      
      
      obj_answer_tf[tf_answer_index].ar = objToArr(cloneObj(user_answer_status));
      obj_answer_tf[tf_answer_index].qtf = cloneObj(qtf);
    }
    
    
    //渲染结果页面
    console.log("---------答对数");
    console.log(true_question_num);
    
    console.log("---------总数");
    var total_num = obj.content.questions.unchoices.length+obj.content.questions.tf.length;
    console.log(total_num);
    
    console.log("---------正确率");
    var true_rate= Math.ceil(true_question_num/total_num*100);
    console.log(true_rate);
    
    var result_title = obj.title;
    console.log(obj.title);
    
    var result_time = obj.time;
    
    console.log(obj.time);
    
    
    var result_html='<div class="result-div-paper-info clearfix"><div class="result-left-info"><div><h5>试卷:  '+result_title+'</h5></div><div><h5>正确题数/总题数: '+true_question_num+'/'+total_num +'</h5></div><div><h5>用 时: '+result_time+'</h5></div></div><div class="result-right-info"><div><h5>正确率</h5></div><div class="result-score">'+true_rate+'\u0025</div></div></div>';
    
    $('.question-area').html(result_html);
    
  }
  
})(jQuery);