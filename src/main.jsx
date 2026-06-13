import React,{useMemo,useState}from'react';
import{createRoot}from'react-dom/client';
import{Menu,Search,User,ShoppingBag,X,ChevronRight,ChevronLeft,Heart,Star,Minus,Plus,Eye,Sparkles,Truck,ShieldCheck,RefreshCw}from'lucide-react';
import'./style.css';

const img={
 hero:'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=1800&q=85',
 lip:'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=85',
 foundation:'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=85',
 palette:'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=900&q=85',
 eye:'https://images.unsplash.com/photo-1709477542149-f4e0e21d590b?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
 serum:'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=900&q=85',
 blush:'https://images.unsplash.com/photo-1631730359585-38a4935cbec4?auto=format&fit=crop&w=900&q=85'
};
const products=[
{id:1,name:'Luxe Matte Foundation',cat:'Foundation',price:38,img:img.foundation,rating:5,vars:['Fair','Warm','Honey','Tan']},
{id:2,name:'Velvet Red Lipstick',cat:'Lipsticks',price:22,img:img.lip,rating:5,vars:['Ruby','Rose','Nude','Berry']},
{id:3,name:'Glow Face Palette',cat:'Face',price:45,img:img.palette,rating:4,vars:['Soft Glow','Bronze','Peach']},
{id:4,name:'Shine Eye Shadow',cat:'Eyes',price:29,img:img.eye,rating:5,vars:['Gold','Brown','Smokey']},
{id:5,name:'Silk Skin Primer',cat:'Primer',price:26,img:img.serum,rating:4,vars:['30ml','50ml']},
{id:6,name:'Cream Blush Stick',cat:'Blush',price:24,img:img.blush,rating:5,vars:['Coral','Pink','Warm']}
];
function App(){
 const[drawer,setDrawer]=useState(null),[panel,setPanel]=useState('main'),[cart,setCart]=useState([]),[query,setQuery]=useState(''),[quick,setQuick]=useState(null),[mega,setMega]=useState(null);
 const total=cart.reduce((s,i)=>s+i.qty*i.price,0),count=cart.reduce((s,i)=>s+i.qty,0);
 const results=useMemo(()=>products.filter(p=>(p.name+p.cat).toLowerCase().includes(query.toLowerCase())),[query]);
 const open=d=>{setDrawer(d);setPanel('main')};
 const add=(p,variant=p.vars[0])=>{setCart(c=>{const key=p.id+variant;const f=c.find(i=>i.key===key);return f?c.map(i=>i.key===key?{...i,qty:i.qty+1}:i):[...c,{...p,key,variant,qty:1}]});setQuick(null);setDrawer('cart')};
 return <>
  <header className='siteHeader' onMouseLeave={()=>setMega(null)}>
   <button className='iconBtn mobileOnly' onClick={()=>open('menu')}><Menu/></button><div className='logo'><img className='imagelogo' src='./assets/Transparent.png'/></div>
   <nav className='desktopNav'>{['Home','Shop','Featured','About'].map(m=><button onMouseEnter={()=>setMega(m)} key={m}>{m}</button>)}</nav>
   <div className='headerActions'><button className='desktopOnly'>USD $</button><button className='desktopOnly'>EN</button><button className='iconBtn' onClick={()=>open('search')}><Search/></button><button className='iconBtn'><User/></button><button className='iconBtn bagBtn' onClick={()=>open('cart')}><ShoppingBag/><b>{count}</b></button></div>
   {mega&&<MegaMenu title={mega} setQuick={setQuick}/>} 
  </header>
  <main>
   <section className='hero reveal'><img src={img.hero}/><div className='heroText'><span>New beauty collection</span><h1>Get Ready To <em>Elevate Your</em> Beauty Ritual</h1><p>Clean luxury makeup, soft skin tones and daily essentials.</p><button onClick={()=>document.querySelector('#products').scrollIntoView({behavior:'smooth'})}>Explore Products</button></div></section>
   <section className='benefits reveal'>{[[Sparkles,'Clean Beauty'],[Truck,'Fast Delivery'],[ShieldCheck,'Secure Payment'],[RefreshCw,'Easy Return']].map(([Icon,t])=><div key={t}><Icon/><b>{t}</b><span>Premium shopping experience</span></div>)}</section>
   <section className='ticker'><div>{[...products,...products].map((p,i)=><span key={i}>✦ {p.name}</span>)}</div></section>
   <section className='overview reveal'><div><p className='eyebrow'>Beautiful overview</p><h2>Luxury cosmetic layout for mobile and desktop</h2><p>Responsive header, mega menu, smooth drawer, animated cards, moving dummy product carousel, product variations, search and cart UI.</p></div><div className='overviewCards'><img src={img.foundation}/><img src={img.palette}/></div></section>
   <section className='collections reveal'><h2>Featured Collections</h2><div className='collectionGrid'>{['Lipsticks','Foundation','Eye Makeup'].map((c,i)=><div onClick={()=>setPanel('collections')||open('menu')} className='collection' key={c}><img src={[img.lip,img.foundation,img.eye][i]}/><span>{c}</span></div>)}</div></section>
   <section id='products' className='reveal'><div className='sectionTitle'><p>Shop The Look</p><h2>Best Sellers</h2></div><div className='productGrid'>{products.map(p=><ProductCard key={p.id} p={p} add={add} setQuick={setQuick}/>)}</div></section>
   <section className='productCarousel reveal'><h2>Dummy Product Moving Carousel</h2><div className='carouselTrack'>{[...products,...products,...products].map((p,i)=><article key={i} onClick={()=>setQuick(p)}><img src={p.img}/><b>{p.name}</b><span>${p.price}.00</span></article>)}</div></section>
   <section className='footerIntro'><button onClick={()=>scrollTo({top:0,behavior:'smooth'})}>Back to top ↑</button><div className='logo'>SHINE</div><p>At Shine Sophisticated, we blend nature’s finest with cutting-edge science to redefine beauty rituals.</p></section>
  </main>
  {drawer&&<Drawer drawer={drawer} setDrawer={setDrawer} panel={panel} setPanel={setPanel} query={query} setQuery={setQuery} results={results} add={add} cart={cart} setCart={setCart} total={total} count={count}/>} 
  {quick&&<QuickView product={quick} close={()=>setQuick(null)} add={add}/>} 
 </>;
}
function MegaMenu({title,setQuick}){return <div className='megaMenu'><div><h3>{title}</h3><p>Explore luxury beauty sections with fast hover mega menu.</p><div className='megaLinks'>{['New Arrivals','Best Sellers','Lipsticks','Foundation','Skin Glow','Gift Sets'].map(x=><a key={x}>{x}</a>)}</div></div><div className='megaProducts'>{products.slice(0,3).map(p=><button key={p.id} onClick={()=>setQuick(p)}><img src={p.img}/><span>{p.name}</span></button>)}</div></div>}
function ProductCard({p,add,setQuick}){const[v,setV]=useState(p.vars[0]);return <article className='product'><button className='wish'><Heart size={17}/></button><div className='pic'><img src={p.img}/><button onClick={()=>setQuick(p)}><Eye size={17}/> Quick view</button></div><div className='stars'>{Array.from({length:p.rating}).map((_,i)=><Star key={i} size={13} fill='currentColor'/>)}</div><h3>{p.name}</h3><p>{p.cat}</p><div className='vars'>{p.vars.map(x=><button className={v===x?'active':''} onClick={()=>setV(x)} key={x}>{x}</button>)}</div><footer><b>${p.price}.00</b><button onClick={()=>add(p,v)}>Add</button></footer></article>}
function Drawer({drawer,setDrawer,panel,setPanel,query,setQuery,results,add,cart,setCart,total,count}){return <div className='overlay'><aside className='drawer'><button className='close' onClick={()=>setDrawer(null)}><X/></button>{drawer==='menu'&&<>{panel==='main'?<MenuPanel setPanel={setPanel}/>:<CollectionsPanel setPanel={setPanel}/>}<div className='drawerBottom'><span>🇻🇳 USD $⌄</span><span>EN⌄</span></div></>}{drawer==='search'&&<div className='searchPanel'><div className='searchBox'><input autoFocus placeholder='Search...' value={query} onChange={e=>setQuery(e.target.value)}/><Search/></div>{query?<div>{results.map(p=><div className='searchItem' key={p.id} onClick={()=>add(p)}><img src={p.img}/><span>{p.name}</span><b>${p.price}</b></div>)}</div>:<p className='empty'>Enter keywords to see quick results</p>}</div>}{drawer==='cart'&&<div><h2>Cart <span>{count}</span></h2>{!cart.length?<div className='cartEmpty'><p>Your cart is empty</p><button onClick={()=>setDrawer(null)}>Continue shopping</button></div>:<><div>{cart.map(i=><div className='cartItem' key={i.key}><img src={i.img}/><div><b>{i.name}</b><p>{i.variant} · ${i.price}.00</p><div className='qty'><button onClick={()=>setCart(c=>c.map(x=>x.key===i.key?{...x,qty:Math.max(1,x.qty-1)}:x))}><Minus size={14}/></button>{i.qty}<button onClick={()=>setCart(c=>c.map(x=>x.key===i.key?{...x,qty:x.qty+1}:x))}><Plus size={14}/></button></div></div></div>)}</div><div className='checkout'><b>Total: ${total}.00</b><button>Checkout</button></div></>}</div>}</aside></div>}
function MenuPanel({setPanel}){return <div><div className='logo drawerLogo'>SHINE</div>{['Featured Collections','Shop','Product Templates','Pages'].map((m,i)=><button className='menuRow' key={m} onClick={()=>i===0&&setPanel('collections')}><span>{m}</span><ChevronRight/></button>)}</div>}
function CollectionsPanel({setPanel}){return <div><h3 className='back' onClick={()=>setPanel('main')}><ChevronLeft/> Featured Collections</h3>{['Lipsticks','Foundation','Eye Makeup'].map((c,i)=><div className='menuCollection' key={c}><img src={[img.lip,img.foundation,img.eye][i]}/><span>{c}</span></div>)}</div>}
function QuickView({product,close,add}){const[v,setV]=useState(product.vars[0]);return <div className='quick'><div className='quickCard'><button className='closeQuick' onClick={close}><X/></button><img src={product.img}/><div><p className='eyebrow'>{product.cat}</p><h2>{product.name}</h2><p>Premium beauty product with soft matte finish and luxury packaging.</p><div className='vars'>{product.vars.map(x=><button className={v===x?'active':''} onClick={()=>setV(x)} key={x}>{x}</button>)}</div><b className='quickPrice'>${product.price}.00</b><button className='quickAdd' onClick={()=>add(product,v)}>Add to cart</button></div></div></div>}
createRoot(document.getElementById('root')).render(<App/>);
