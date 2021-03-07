const { ChavascriptBabelPlugin } = require('../dist/arabJs-parser');
const babel = require('@babel/core');

const inputCode = `

// ترتيب الدول حسب نسبة الوفاة استناداً
//على الاصابة بفيروس كورونا المستجد  
لنفرض الرابط = "https://covid19-api.com/country/all?format=json"
لنفرض حمل_المعلومات = (الرابط) => حمل(الرابط).ثم(البيانات => البيانات.الى_جيسون())
لنفرض نقح_البيانات = (البيانات) => البيانات.نقح(({country,confirmed,deaths}) => ({الدولة : country , نسبة_الوفاة :deaths/confirmed*100}))
لنفرض صفي_البيانات = (البيانات) => البيانات.صفي(({نسبة_الوفاة}) => !رقمي(نسبة_الوفاة))
لنفرض رتب_الدول = (الدول) => الدول.رتب((الاصغر, الاكبر) => الاصغر.نسبة_الوفاة - الاكبر.نسبة_الوفاة)
لنفرض دول_الخليج = (الدول) => الدول.صفي(({الدولة}) => ["Saudi Arabia", "Qatar", "UAE" , "Bahrain", "Kuwait", "Oman"].يوجد(الدولة) )
لنفرض d3 = مجهول


استورد ("https://unpkg.com/d3?module")
  .ثم(المكتبة =>d3 = المكتبة)
  .ثم(_=> حمل_المعلومات(الرابط))
  .ثم(نقح_البيانات)
  .ثم(صفي_البيانات)
  .ثم(رتب_الدول)
  .ثم(دول_الخليج)
  .ثم(الدول => نمذج_البيانات(الدول))
  .فشل(الخطأ => اطبع.خلل(الخطأ))

  لنفرض نمذج_البيانات = (الدول) => {
     margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
    
     x = d3.scaleBand()
              .range([0, width])
              .padding(0.1);
     y = d3.scaleLinear()
              .range([height, 0]);
              
     svg = d3.select(".myChart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");
    
    
      // format the data
    
      // Scale the range of the الدول in the domains
      x.domain(الدول.map((d)=>  d.الدولة));
      y.domain([0, d3.max(الدول, (d)=> d.نسبة_الوفاة )]);
    
      // append the rectangles for the bar chart
      svg.selectAll(".bar")
          .data(الدول)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", (d)=>  x(d.الدولة))
          .attr("width", x.bandwidth())
          .attr("y", (d)=> y(d.نسبة_الوفاة ))
          .attr("height", (d)=>  height - y(d.نسبة_الوفاة ));
    
      // add the x Axis
      svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));
    
      // add the y Axis
      svg.append("g")
          .call(d3.axisLeft(y));
  }
`;

const output = babel.transformSync(inputCode, {
  plugins: [ChavascriptBabelPlugin]
});

console.log(output.code);