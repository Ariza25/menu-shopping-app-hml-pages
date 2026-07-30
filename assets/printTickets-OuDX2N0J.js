function N(t){return t.replace(/[&<>]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;"})[e]??e)}function y(t){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(t/100)}function A(t){return new Intl.NumberFormat("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2}).format(t/100)}function T(t){const e=t?new Date(t):new Date;return Number.isNaN(e.getTime())?new Intl.DateTimeFormat("pt-BR",{dateStyle:"short",timeStyle:"short"}).format(new Date):new Intl.DateTimeFormat("pt-BR",{dateStyle:"short",timeStyle:"short"}).format(e)}function f(t,e=32){const o=t.trim();if(o.length>=e)return o.slice(0,e);const i=Math.floor((e-o.length)/2);return`${" ".repeat(i)}${o}`}function l(t="-",e=32){return t.repeat(e)}function s(t,e){const o=t.trim();return o.length<=e?o:o.slice(0,Math.max(e-1,0)).trimEnd()}function a(t,e){return s(t,e).padEnd(e," ")}function u(t,e){return s(t,e).padStart(e," ")}function I(t){return(t.replace(/[^a-zA-Z0-9]/g,"")||t||"-").slice(-6).toUpperCase()}function h(t,e){return`${a(t,18)}${u(y(e),14)}`}function P(t="Impressao"){const e=window.open("","_blank","width=420,height=720");return e&&(e.document.write(`
      <html>
        <head><title>${N(t)}</title></head>
        <body style="font-family: monospace; padding: 12px;">Preparando impressao...</body>
      </html>
    `),e.document.close()),e}function O(t,e,o){const i=o&&!o.closed?o:P(t);i&&(i.document.write(`
    <html>
      <head>
        <title>${N(t)}</title>
        <style>
          @page { size: 58mm auto; margin: 2mm; }
          html, body { margin: 0; padding: 0; width: 58mm; }
          pre { font: 10px/1.25 monospace; margin: 0; max-width: 54mm; white-space: pre-wrap; }
        </style>
      </head>
      <body>
        <pre>${N(e)}</pre>
      </body>
    </html>
  `),i.document.close(),i.print())}function b(t,e){var r;const o=t.items.filter(n=>n.status!=="cancelled"),i=o.flatMap(n=>{var S;const c=new Intl.NumberFormat("pt-BR",{minimumFractionDigits:3,maximumFractionDigits:3}).format(n.quantity),d=s(n.name.toUpperCase(),15);return[`${a(I(n.productId),6)} ${a(d,15)} ${u(c,5)} ${u(A(n.unitPrice),5)}`,(S=n.addons)!=null&&S.length?`       Adic.: ${s(n.addons.map(C=>C.name).join(", "),24)}`:"",n.observation?`       Obs.: ${s(n.observation,24)}`:""].filter(Boolean)}).join(`
`),p=(r=t.payments)!=null&&r.length?t.payments.map(n=>`${a(D(n.method),14)}${u(y(n.amount),18)}${n.note?`
  ${s(n.note,28)}`:""}`).join(`
`):`${a(D(t.paymentMethod||"-"),14)}${u(y(t.total),18)}`,$=t.channel==="counter"?"VENDA BALCÃO":"COMANDA";O(`${$} ${t.tabNumber}`,[f("MENU SHOPPING"),f("CUPOM NAO FISCAL"),l("="),`${a("Data",9)}${T(t.closedAt||t.openedAt)}`,`${a("Pedido",9)}#${t.tabNumber.toString().padStart(4,"0")}`,`${a("Operador",9)}${s(t.staffName||"Operador",23)}`,`${a(t.channel==="counter"?"Venda":"Mesa",9)}${s(t.label||"-",23)}`,t.customerName?`${a("Cliente",9)}${s(t.customerName,23)}`:"",t.sector?`${a("Setor",9)}${s(t.sector,23)}`:"",l("-"),`${a("COD",6)} ${a("DESCRICAO",15)} ${u("QTD",5)} ${u("VL",5)}`,l("-"),i||"Sem itens.",l("-"),`${a("QTD TOTAL ITENS",18)}${u(String(o.reduce((n,c)=>n+c.quantity,0)),14)}`,h("VALOR PRODUTOS",t.subtotal),t.serviceFee?h("SERVICO",t.serviceFee):"",t.discount?h("DESCONTO",-Math.abs(t.discount)):"",h("VALOR TOTAL",t.total),l("-"),"FORMA PAGAMENTO",p||"-",l("-"),f(`Pedido: ${t.tabNumber}`),f("Obrigado pela preferência")].filter(Boolean).join(`
`),e)}function w(t,e=[],o){const i=t.items.filter(r=>r.status!=="cancelled"&&r.requiresProduction!==!1).reduce((r,n)=>{const c=n.preparationStationId||"station_counter";return r[c]=[...r[c]??[],n],r},{}),p=e.filter(r=>r.active),$=Object.entries(i).map(([r,n])=>{var g;const c=((g=n[0])==null?void 0:g.preparationStationName)||"Balcão",d=p.find(m=>m.stationId===r)??p.find(m=>!m.stationId);return{title:`Produção ${t.tabNumber} ${c}`,body:[`== ${c.toUpperCase()} ==`,d?`Impressora: ${d.name}${d.target?` | ${d.target}`:""}`:"",`Comanda #${t.tabNumber.toString().padStart(4,"0")} | ${t.label}`,...n.map(m=>`${m.quantity}x ${m.name}${m.observation?`
   Obs: ${m.observation}`:""}`)].filter(Boolean).join(`
`)}});if($.length===0){O(`Produção ${t.tabNumber}`,"Sem itens para produção.");return}O(`Produção ${t.tabNumber}`,$.map(r=>r.body).join(`
${l("=")}
`),o)}function D(t){return{cash:"Dinheiro",pix:"Pix",card:"Cartão de Crédito",credit:"Cartão de Crédito",debit:"Cartão de Débito",voucher:"Voucher"}[t]??t}export{w as a,P as c,b as p};
