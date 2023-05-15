let form = document.forms.calculator
//  ----------------------------
form.deposit.addEventListener('focus',function(e){
  form.deposit.classList.remove('deposit')
  this.classList.add('moused')
})
form.deposit.addEventListener('blur',function(e){
  form.deposit.classList.remove('moused')
  this.classList.add('deposit')
})
form.deposit.addEventListener('keydown',function(e){
    if (e.keyCode === 13){
      if(form.deposit.classList.contains('moused')){
        form.deposit.classList.remove('moused')
        this.classList.add('deposit')
      }else{
        return;
      }
    }
})
// -----------------------------------------------------------------
form.month.addEventListener('input', () => {
    let inputValue = form.month.value.replace(/^0/g, '');
    form.month.value = inputValue;
})
form.deposit.addEventListener('input', () => {
    let inputDepositValue = form.deposit.value.replace(/^0/g, '');
    form.deposit.value = inputDepositValue;
})
// -----------------------------------------------------------------
form.month.addEventListener('focus',function(e){
  form.month.classList.remove('month')
  this.classList.add('moused')
})
form.month.addEventListener('blur',function(e){
  form.month.classList.remove('moused')
  this.classList.add('month')
})
form.month.addEventListener('keydown',function(e){
    if (e.keyCode === 13){
      if(form.month.classList.contains('moused')){
        form.month.classList.remove('moused')
        this.classList.add('deposit')
      }else{
        return;
      }
    }
})
// -------------------------------------------------
 let tooltipElem;
 document.onmouseover = function(e){
    let target = e.target
    let tooltipHTML = target.dataset.tooltip
    if(!tooltipHTML) return
    tooltipElem = document.createElement('div')
    tooltipElem.className = 'tooltip'
    tooltipElem.innerHTML = tooltipHTML
    document.body.append(tooltipElem)

    let coords = target.getBoundingClientRect()
    let left = coords.left + (target.offsetWidth-tooltipElem.offsetWidth) / 2
    if(left<0) left = 5

    let top = coords.top + tooltipElem.offsetHeight/3
    if(top<0) top= coords.top - target.offsetHeight + 5

    tooltipElem.style.left = left + 'px'
    tooltipElem.style.top = top + 'px'
 }
 document.onmouseout = function(e){
  if(tooltipElem){
   tooltipElem.remove()
   tooltipElem = null
  }
}
// 1-----------------------------------------------------
 form.deposit.addEventListener('change',calculate)
 form.month.addEventListener('change',calculate)

 form.rate.addEventListener('change',calculate)
 form.save.addEventListener('change',calculate)
 form.sub.addEventListener('change',calculate)
   
function calculate(){
let initial = +form.deposit.value
if(!initial){
return
}
let year = form.month.value/12    
if(!year){
    return
    }


form.time.value = form.month.value;
form.money.value = form.deposit.value;

if(form.month.value > 24){
    form.month.value = 24;
    year=2
}
if(form.month.value < 3){
    form.month.value = 3
    year=0.25
}
if(form.deposit.value < 50000){
    form.deposit.value=50000;
    initial=50000;
}
if(form.deposit.value > 30000000){
    form.deposit.value=30000000;
    initial=30000000;
}
// -----------------------------------------------
let monthLabel =document.querySelector('.monthLabel')
if(form.month.value == 3 || form.month.value == 4 || form.month.value >= 22){
    monthLabel.innerHTML = 'месяца'
}else if(form.month.value == 21){
    monthLabel.innerHTML = 'месяц'
}
else{
    monthLabel.innerHTML = 'месяцев'
}
let p = document.querySelector('.sum') 
p.innerHTML = 'Сбережения за '+ form.month.value + ' ' + monthLabel.innerHTML
// ------------------------------------------------
let interest ;
let proc;
let rate = document.getElementById('plus1').checked
let save = document.getElementById('plus2').checked
let sub= document.getElementById('plus3').checked

if(year>=0.25 && year<0.5){
    if(!rate && !save && !sub){
        interest = 0.05
        proc = 0
    }
    if(rate && !save && !sub){
        interest = 0.06
        proc = 0
    }
    if(!rate && !save && sub){
        interest = 0.055
        proc = 0
    }
    if(!rate && save && !sub){
        interest = 0.05
        proc = 0.0011
    }
    if( rate && save && !sub){
        interest = 0.06
        proc = 0.0016
    }
    if( !rate && save && sub){
        interest = 0.055
        proc = 0.0014
    }
    if( rate && !save && sub){
        interest = 0.065
        proc = 0
    }
    if( rate && save && sub){
        interest = 0.065
        proc = 0.0019
    }
}
if(year>=0.5 && year<1){
    if(!rate && !save && !sub){
        interest = 0.055
        proc = 0
    }
    if(rate && !save && !sub){
        interest = 0.065
        proc = 0
    }
    if(!rate && !save && sub){
        interest = 0.06
        proc = 0
    }
    if(!rate && save && !sub){
        interest = 0.055
        proc = 0.0014
    }
    if(rate && save && !sub){
        interest = 0.065
        proc = 0.0019
    }
    if(rate && !save && sub){
        interest = 0.07
        proc = 0
    }
    if(!rate && save && sub){
        interest = 0.06
        proc = 0.0016
    }
    if(rate && save && sub){
        interest = 0.07
        proc = 0.0022
    }
}
if(year>=1 && year<1.5){
    if(!rate && !save && !sub){
        interest = 0.055
        proc = 0
    }
    if(rate && !save && !sub){
        interest = 0.065
        proc = 0
    }
    if(!rate && !save && sub){
        interest = 0.06
        proc = 0
    }
    if(rate && !save && sub){
        interest = 0.075
        proc = 0
    }
    if(!rate && save && !sub){
        interest = 0.055
        switch(year){
            case 1 : proc = 0.0014;
            break;
            case 13/12 : proc = 0.0015;
            break;
            case 14/12 : proc = 0.0016;
            break;
            case 15/12 : proc = 0.0018;
            break;
            case 16/12 : proc = 0.0019;
            break;
            case 17/12 : proc = 0.002;
            break;
        }
    }
    if(rate && save && !sub){
        interest = 0.065
        switch(year){
            case 1 : proc = 0.0019;
            break;
            case 13/12 : proc = 0.0021;
            break;
            case 14/12 : proc = 0.0023;
            break;
            case 15/12 : proc = 0.0025;
            break;
            case 16/12 : proc = 0.0027;
            break;
            case 17/12 : proc = 0.0028;
            break;
        }
    }
    if(!rate && save && sub){
        interest = 0.06
       switch(year){
            case 1 : proc = 0.0016;
            break;
            case 13/12 : proc = 0.0018;
            break;
            case 14/12 : proc = 0.0019;
            break;
            case 15/12 : proc = 0.0021;
            break;
            case 16/12 : proc = 0.0023;
            break;
            case 17/12 : proc = 0.0024;
            break;
        }
    }
    if(rate && save && sub){
        interest = 0.075
        switch(year){
            case 1 : proc = 0.0026;
            break;
            case 13/12 : proc = 0.0028;
            break;
            case 14/12 : proc = 0.0031;
            break;
            case 15/12 : proc = 0.0033;
            break;
            case 16/12 : proc = 0.0036;
            break;
            case 17/12 : proc = 0.0038;
            break;
        }
    }
}
if(year>=1.5 && year<=2){
    if(!rate && !save && !sub){
        interest = 0.055
        proc = 0
    }
    if(rate && !save && !sub){
        interest = 0.07
        proc = 0
    }
    if(!rate && !save && sub){
        interest = 0.06
        proc = 0
    }
    if(rate && !save && sub){
        interest = 0.08
        proc = 0
    }
    if(!rate && save && !sub){
        interest = 0.055
        switch(year){
            case 1.5 : proc = 0.0021;
            break;
            case 19/12 : proc = 0.0023;
            break;
            case 20/12 : proc = 0.0024;
            break;
            case 21/12 : proc = 0.0025;
            break;
            case 22/12 : proc = 0.0027;
            break;
            case 23/12 : proc = 0.0028;
            break;
            case 2 : proc = 0.0029;
            break;
        }
    }
    if(rate && save && !sub){
        interest = 0.07
        switch(year){
            case 1.5 : proc = 0.0035;
            break;
            case 19/12 : proc = 0.0037;
            break;
            case 20/12 : proc = 0.004;
            break;
            case 21/12 : proc = 0.0042;
            break;
            case 22/12 : proc = 0.0044;
            break;
            case 23/12 : proc = 0.0046;
            break;
            case 2 : proc = 0.0049;
            break;
        }
    }
    if(!rate && save && sub){
        interest = 0.06
        switch(year){
            case 1.5 : proc = 0.0026;
            break;
            case 19/12 : proc = 0.0027;
            break;
            case 20/12 : proc = 0.0029;
            break;
            case 21/12 : proc = 0.0030;
            break;
            case 22/12 : proc = 0.0032;
            break;
            case 23/12 : proc = 0.0034;
            break;
            case 2 : proc = 0.0035;
            break;
        }
    }
    if(rate && save && sub){
        interest = 0.08
       switch(year){
            case 1.5 : proc = 0.0046;
            break;
            case 19/12 : proc = 0.0049;
            break;
            case 20/12 : proc = 0.0052;
            break;
            case 21/12 : proc = 0.0055;
            break;
            case 22/12 : proc = 0.0058;
            break;
            case 23/12 : proc = 0.0061;
            break;
            case 2 : proc = 0.0064;
            break;
        }
    }
    
}
let result = Math.trunc(initial*(1+(interest+proc)*year)) 
 document.getElementById('sum').innerHTML = result.toLocaleString('ru-RU'); 
let perc = (interest + proc)*100 
 document.getElementById('percent').innerHTML = perc.toFixed(2) + ' %'
let int = interest*100
 document.getElementById('bid').innerHTML = int.toFixed(2) + ' %'  
}
// 2-------------------------------------------------------------
  form.money.addEventListener('input',rangeSelector)
  form.time.addEventListener('input',rangeSelector)

 function rangeSelector(){
    form.month.value=form.time.value
    form.deposit.value = form.money.value;

    let initial = +form.money.value
    if(!initial){return}
    let year = form.time.value/12    
    if(!year){return}

    let monthLabel =document.querySelector('.monthLabel')
    if(form.time.value == 3 || form.time.value == 4 || form.time.value >= 22){
        monthLabel.innerHTML = 'месяца'
    }else if(form.time.value == 21){
        monthLabel.innerHTML = 'месяц'
    }
    else{
        monthLabel.innerHTML = 'месяцев'
    }
    let p = document.querySelector('.sum') 
    p.innerHTML = 'Сбережения за '+ form.time.value + ' ' + monthLabel.innerHTML

    let interest ;
    let proc;
    let rate = document.getElementById('plus1').checked
    let save = document.getElementById('plus2').checked
    let sub= document.getElementById('plus3').checked

if(year>=0.25 && year<0.5){
    if(!rate && !save && !sub){
        interest = 0.05
        proc = 0
    }
    if(rate && !save && !sub){
        interest = 0.06
        proc = 0
    }
    if(!rate && !save && sub){
        interest = 0.055
        proc = 0
    }
    if(!rate && save && !sub){
        interest = 0.05
        proc = 0.0011
    }
    if( rate && save && !sub){
        interest = 0.06
        proc = 0.0016
    }
    if( !rate && save && sub){
        interest = 0.055
        proc = 0.0014
    }
    if( rate && !save && sub){
        interest = 0.065
        proc = 0
    }
    if( rate && save && sub){
        interest = 0.065
        proc = 0.0019
    }
}
if(year>=0.5 && year<1){
    if(!rate && !save && !sub){
        interest = 0.055
        proc = 0
    }
    if(rate && !save && !sub){
        interest = 0.065
        proc = 0
    }
    if(!rate && !save && sub){
        interest = 0.06
        proc = 0
    }
    if(!rate && save && !sub){
        interest = 0.055
        proc = 0.0014
    }
    if(rate && save && !sub){
        interest = 0.065
        proc = 0.0019
    }
    if(rate && !save && sub){
        interest = 0.07
        proc = 0
    }
    if(!rate && save && sub){
        interest = 0.06
        proc = 0.0016
    }
    if(rate && save && sub){
        interest = 0.07
        proc = 0.0022
    }
}
if(year>=1 && year<1.5){
    if(!rate && !save && !sub){
        interest = 0.055
        proc = 0
    }
    if(rate && !save && !sub){
        interest = 0.065
        proc = 0
    }
    if(!rate && !save && sub){
        interest = 0.06
        proc = 0
    }
    if(rate && !save && sub){
        interest = 0.075
        proc = 0
    }
    if(!rate && save && !sub){
        interest = 0.055
        switch(year){
            case 1 : proc = 0.0014;
            break;
            case 13/12 : proc = 0.0015;
            break;
            case 14/12 : proc = 0.0016;
            break;
            case 15/12 : proc = 0.0018;
            break;
            case 16/12 : proc = 0.0019;
            break;
            case 17/12 : proc = 0.002;
            break;
        }
    }
    if(rate && save && !sub){
        interest = 0.065
        switch(year){
            case 1 : proc = 0.0019;
            break;
            case 13/12 : proc = 0.0021;
            break;
            case 14/12 : proc = 0.0023;
            break;
            case 15/12 : proc = 0.0025;
            break;
            case 16/12 : proc = 0.0027;
            break;
            case 17/12 : proc = 0.0028;
            break;
        }
    }
    if(!rate && save && sub){
        interest = 0.06
       switch(year){
            case 1 : proc = 0.0016;
            break;
            case 13/12 : proc = 0.0018;
            break;
            case 14/12 : proc = 0.0019;
            break;
            case 15/12 : proc = 0.0021;
            break;
            case 16/12 : proc = 0.0023;
            break;
            case 17/12 : proc = 0.0024;
            break;
        }
    }
    if(rate && save && sub){
        interest = 0.075
        switch(year){
            case 1 : proc = 0.0026;
            break;
            case 13/12 : proc = 0.0028;
            break;
            case 14/12 : proc = 0.0031;
            break;
            case 15/12 : proc = 0.0033;
            break;
            case 16/12 : proc = 0.0036;
            break;
            case 17/12 : proc = 0.0038;
            break;
        }
    }
}
if(year>=1.5 && year<=2){
    if(!rate && !save && !sub){
        interest = 0.055
        proc = 0
    }
    if(rate && !save && !sub){
        interest = 0.07
        proc = 0
    }
    if(!rate && !save && sub){
        interest = 0.06
        proc = 0
    }
    if(rate && !save && sub){
        interest = 0.08
        proc = 0
    }
    if(!rate && save && !sub){
        interest = 0.055
        switch(year){
            case 1.5 : proc = 0.0021;
            break;
            case 19/12 : proc = 0.0023;
            break;
            case 20/12 : proc = 0.0024;
            break;
            case 21/12 : proc = 0.0025;
            break;
            case 22/12 : proc = 0.0027;
            break;
            case 23/12 : proc = 0.0028;
            break;
            case 2 : proc = 0.0029;
            break;
        }
    }
    if(rate && save && !sub){
        interest = 0.07
        switch(year){
            case 1.5 : proc = 0.0035;
            break;
            case 19/12 : proc = 0.0037;
            break;
            case 20/12 : proc = 0.004;
            break;
            case 21/12 : proc = 0.0042;
            break;
            case 22/12 : proc = 0.0044;
            break;
            case 23/12 : proc = 0.0046;
            break;
            case 2 : proc = 0.0049;
            break;
        }
    }
    if(!rate && save && sub){
        interest = 0.06
        switch(year){
            case 1.5 : proc = 0.0026;
            break;
            case 19/12 : proc = 0.0027;
            break;
            case 20/12 : proc = 0.0029;
            break;
            case 21/12 : proc = 0.0030;
            break;
            case 22/12 : proc = 0.0032;
            break;
            case 23/12 : proc = 0.0034;
            break;
            case 2 : proc = 0.0035;
            break;
        }
    }
    if(rate && save && sub){
        interest = 0.08
       switch(year){
            case 1.5 : proc = 0.0046;
            break;
            case 19/12 : proc = 0.0049;
            break;
            case 20/12 : proc = 0.0052;
            break;
            case 21/12 : proc = 0.0055;
            break;
            case 22/12 : proc = 0.0058;
            break;
            case 23/12 : proc = 0.0061;
            break;
            case 2 : proc = 0.0064;
            break;
        }
    }
    
}
    let result = Math.trunc(initial*(1+(interest+proc)*year))
    document.getElementById('sum').innerHTML = result.toLocaleString('ru-RU'); 
    let perc = (interest + proc)*100 
    document.getElementById('percent').innerHTML = perc.toFixed(2) + ' %'
    let int = interest*100
    document.getElementById('bid').innerHTML = int.toFixed(2) + ' %'  
    }