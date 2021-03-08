import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';


const snippets = [
  `اطبع.نص("اهلاً بالعالم")`
  // 
  ,
  `
// متتالية فيبوناتشي

داله متتالية_فيبوناتشي (رقم){  
  اذا (رقم <= 1 )
  	الجواب رقم
  الجواب  متتالية_فيبوناتشي (رقم - 1) +  متتالية_فيبوناتشي(رقم - 2)
}
لنفرض مصفوفة = [1,2,3,4,5]

مصفوفة.لكل(عنصر => اطبع.نص("الرقم:" ,عنصر ," النتيجة: ", متتالية_فيبوناتشي(عنصر)))
`
  // 
  ,
  // 
  `
// ترتيب الدول حسب نسبة الوفاة استناداً
// على الاصابة بفيروس كورونا المستجد 
لنفرض الرابط = "https://covid19-api.com/country/all?format=json"
لنفرض حمل_المعلومات = (الرابط) => حمل(الرابط).ثم(البيانات => البيانات.الى_جيسون())
لنفرض نقح_البيانات = (البيانات) => البيانات.نقح(({country,confirmed,deaths}) => ({الدولة : country , نسبة_الوفاة :deaths/confirmed*100}))
لنفرض صفي_البيانات = (البيانات) => البيانات.صفي(({نسبة_الوفاة}) => !رقمي(نسبة_الوفاة))
لنفرض رتب_الدول = (الدول) => الدول.رتب((الاصغر, الاكبر) => الاصغر.نسبة_الوفاة - الاكبر.نسبة_الوفاة)

حمل_المعلومات(الرابط)
		.ثم(نقح_البيانات)
		.ثم(صفي_البيانات)
		.ثم(رتب_الدول)
		.ثم(الدول=> اطبع.جدول(الدول))
		.فشل(الخطأ => اطبع.خلل(الخطأ))

`
  //
  ,
  //
  `
  // نمذجة نسبة الوفاة للدول العربية استناداً
  // على الاصابة بفيروس كورونا المستجد
  // البرنامج يستخدم مكتبة D3 لنمذجة البيانات
  لنفرض الرابط = "https://covid19-api.com/country/all?format=json"
  لنفرض حمل_المعلومات = (الرابط) => حمل(الرابط).ثم(البيانات => البيانات.الى_جيسون())
  لنفرض نقح_البيانات = (البيانات) => البيانات.نقح(({country,confirmed,deaths}) =>
                                                  ({الدولة : country , نسبة_الوفاة :deaths/confirmed*100}))
  لنفرض صفي_البيانات = (البيانات) => البيانات.صفي(({نسبة_الوفاة}) => !رقمي(نسبة_الوفاة))
  لنفرض رتب_الدول = (الدول) => الدول.رتب((الاصغر, الاكبر) => الاصغر.نسبة_الوفاة - الاكبر.نسبة_الوفاة)
  لنفرض الدول_العربية = (الدول) => الدول.صفي(({الدولة}) =>
                                             ["Yemen","Tunisia","Syria","Morocco","Libya","Lebanon","Jordan",
                                              "Iraq","Sudan","Algeria","Egypt","Saudi Arabia", "Qatar", "UAE" ,
                                              "Bahrain", "Kuwait", "Oman"].يحتوي(الدولة) )
  لنفرض d3 = مجهول
  
  استورد ("https://unpkg.com/d3?module")
    .ثم(المكتبة =>d3 = المكتبة)
    .ثم(_=> حمل_المعلومات(الرابط))
    .ثم(نقح_البيانات)
    .ثم(صفي_البيانات)
    .ثم(رتب_الدول)
    .ثم(الدول_العربية)
    .ثم(الدول => نمذج_البيانات(الدول))
    .فشل(الخطأ => اطبع.خلل(الخطأ))

// D3 code in JS

    لنفرض نمذج_البيانات = (الدول) => {
       margin = {top: 20, right: 20, bottom: 30, left: 40},
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;
      
       x = d3.scaleBand()
                .range([0, width])
                .padding(0.1);
       y = d3.scaleLinear()
              .range([height, 0]);
      
        d3.select(".myChart").html("");
       svg = d3.select(".myChart").append("svg")
       .attr("width", '100%')
       .attr("height", '100%')
       .attr("viewBox", '20 0 910 7000')
      .attr('preserveAspectRatio','xMinYMin')
       .append("g")
          .attr("transform", 
                "translate(" + margin.left + "," + margin.top + ")");
      
         x.domain(الدول.map((d)=>  d.الدولة));
        y.domain([0, d3.max(الدول, (d)=> d.نسبة_الوفاة )]);
      
        svg.selectAll(".bar")
            .data(الدول)
          .enter().append("rect")
            .attr("class", "bar")
            .attr("x", (d)=>  x(d.الدولة))
            .attr("width", x.bandwidth())
            .attr("y", (d)=> y(d.نسبة_الوفاة ))
            .attr("height", (d)=>  height - y(d.نسبة_الوفاة ))
            .attr("fill",(d,i)=> d3.interpolateTurbo(i/17))



        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

      
        svg.append("g")
            .call(d3.axisLeft(y))
            .selectAll("text")
            .attr("x", -10)
           .style("text-anchor", "start");
    }
  `
  
  ];


const useStyles = makeStyles((theme) => ({
  label: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function CodeSnipts({ onCodeChange }) {
  const classes = useStyles();
  const [snippet, setSnippet] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setSnippet(event.target.value);
    const index  = event.target.value;
    onCodeChange(snippets[index], index === 3 ? "DOM": "console")
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <label className={classes.label}>
        أختر برنامج
      </label>
      <FormControl className={classes.formControl}>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={snippet}
          onChange={handleChange}
        >
          <MenuItem value={0}>اهلاً بالعالم</MenuItem>
          <MenuItem value={1}>متتالية فيبوناتشي</MenuItem>
          <MenuItem value={2}>ترتيب الدول على حسب نسبة الوفيات بكورونا</MenuItem>
          <MenuItem value={3}>نمذجة نسبة الوفيات للدول العربية</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
