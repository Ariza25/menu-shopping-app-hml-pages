function g(t){return t.replace(/[&<>]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;"})[e]??e)}function O(t){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(t/100)}function A(t){return new Intl.NumberFormat("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2}).format(t/100)}function C(t){const e=t?new Date(t):new Date;return Number.isNaN(e.getTime())?new Intl.DateTimeFormat("pt-BR",{dateStyle:"short",timeStyle:"short"}).format(new Date):new Intl.DateTimeFormat("pt-BR",{dateStyle:"short",timeStyle:"short"}).format(e)}function f(t,e=32){const o=t.trim();if(o.length>=e)return o.slice(0,e);const a=Math.floor((e-o.length)/2);return`${" ".repeat(a)}${o}`}function u(t="-",e=32){return t.repeat(e)}function s(t,e){const o=t.trim();return o.length<=e?o:o.slice(0,Math.max(e-1,0)).trimEnd()}function i(t,e){return s(t,e).padEnd(e," ")}function l(t,e){return s(t,e).padStart(e," ")}function I(t){return(t.replace(/[^a-zA-Z0-9]/g,"")||t||"-").slice(-6).toUpperCase()}function h(t,e){return`${i(t,18)}${l(O(e),14)}`}function P(t="Impressao"){const e=window.open("","_blank","width=420,height=720");return e&&(e.document.write(`
      <html>
        <head><title>${g(t)}</title></head>
        <body style="font-family: monospace; padding: 12px;">Preparando impressao...</body>
      </html>
    `),e.document.close()),e}function y(t,e,o){const a=o&&!o.closed?o:P(t);a&&(a.document.write(`
    <html>
      <head>
        <title>${g(t)}</title>
        <style>
          @page { size: 58mm auto; margin: 2mm; }
          html, body { margin: 0; padding: 0; width: 58mm; }
          pre { font: 10px/1.25 monospace; margin: 0; max-width: 54mm; white-space: pre-wrap; }
        </style>
      </head>
      <body>
        <pre>${g(e)}</pre>
      </body>
    </html>
  `),a.document.close(),a.print())}function w(t,e){var r;const o=t.items.filter(n=>n.status!=="cancelled"),a=o.flatMap(n=>{var D;const c=new Intl.NumberFormat("pt-BR",{minimumFractionDigits:3,maximumFractionDigits:3}).format(n.quantity),d=s(n.name.toUpperCase(),15);return[`${i(I(n.productId),6)} ${i(d,15)} ${l(c,5)} ${l(A(n.unitPrice),5)}`,(D=n.addons)!=null&&D.length?`       Adic.: ${s(n.addons.map(T=>T.name).join(", "),24)}`:"",n.observation?`       Obs.: ${s(n.observation,24)}`:""].filter(Boolean)}).join(`
`),p=(r=t.payments)!=null&&r.length?t.payments.map(n=>`${i(S(n.method),14)}${l(O(n.amount),18)}${n.note?`
  ${s(n.note,28)}`:""}`).join(`
`):`${i(S(t.paymentMethod||"-"),14)}${l(O(t.total),18)}`,$=t.channel==="counter"?"VENDA BALCÃO":t.channel==="self_service"?"AUTOATENDIMENTO":"COMANDA";y(`${$} ${t.tabNumber}`,[f("MENU SHOPPING"),f("CUPOM NAO FISCAL"),u("="),`${i("Data",9)}${C(t.closedAt||t.openedAt)}`,`${i("Pedido",9)}#${t.tabNumber.toString().padStart(4,"0")}`,`${i("Operador",9)}${s(t.staffName||"Operador",23)}`,`${i(t.channel==="counter"||t.channel==="self_service"?"Venda":"Mesa",9)}${s(t.label||"-",23)}`,t.customerName?`${i("Cliente",9)}${s(t.customerName,23)}`:"",t.sector?`${i("Setor",9)}${s(t.sector,23)}`:"",u("-"),`${i("COD",6)} ${i("DESCRICAO",15)} ${l("QTD",5)} ${l("VL",5)}`,u("-"),a||"Sem itens.",u("-"),`${i("QTD TOTAL ITENS",18)}${l(String(o.reduce((n,c)=>n+c.quantity,0)),14)}`,h("VALOR PRODUTOS",t.subtotal),t.serviceFee?h("SERVICO",t.serviceFee):"",t.discount?h("DESCONTO",-Math.abs(t.discount)):"",h("VALOR TOTAL",t.total),u("-"),"FORMA PAGAMENTO",p||"-",u("-"),f(`Pedido: ${t.tabNumber}`),f("Obrigado pela preferência")].filter(Boolean).join(`
`),e)}function b(t,e=[],o){const a=t.items.filter(r=>r.status!=="cancelled"&&r.requiresProduction!==!1).reduce((r,n)=>{const c=n.preparationStationId||"station_counter";return r[c]=[...r[c]??[],n],r},{}),p=e.filter(r=>r.active),$=Object.entries(a).map(([r,n])=>{var N;const c=((N=n[0])==null?void 0:N.preparationStationName)||"Balcão",d=p.find(m=>m.stationId===r)??p.find(m=>!m.stationId);return{title:`Produção ${t.tabNumber} ${c}`,body:[`== ${c.toUpperCase()} ==`,d?`Impressora: ${d.name}${d.target?` | ${d.target}`:""}`:"",`Comanda #${t.tabNumber.toString().padStart(4,"0")} | ${t.label}`,...n.map(m=>`${m.quantity}x ${m.name}${m.observation?`
   Obs: ${m.observation}`:""}`)].filter(Boolean).join(`
`)}});if($.length===0){y(`Produção ${t.tabNumber}`,"Sem itens para produção.");return}y(`Produção ${t.tabNumber}`,$.map(r=>r.body).join(`
${u("=")}
`),o)}function S(t){return{cash:"Dinheiro",pix:"Pix",card:"Cartão de Crédito",credit:"Cartão de Crédito",debit:"Cartão de Débito",voucher:"Voucher"}[t]??t}export{b as a,P as c,w as p};
