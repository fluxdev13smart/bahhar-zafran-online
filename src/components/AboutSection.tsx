<div className={`reveal ${isVisible ? 'reveal-in' : ''} mt-14 grid lg:grid-cols-[1.05fr_1fr] gap-8 items-stretch`} style={{ transitionDelay: '80ms' }}>
  <div className="glass rounded-[2rem] overflow-hidden">
    <div
      className="h-72 sm:h-full min-h-[20rem] bg-cover bg-center"
      style={{ backgroundImage: 'url("/exterior.webp")' }}
      role="img"
      aria-label="Bahar Al Zafran storefront in Dubai"
    />
  </div>

  <div className="glass rounded-[2rem] p-7 sm:p-10 flex flex-col justify-center">
    <h3 className="font-playfair text-2xl sm:text-3xl font-semibold">Our heritage</h3>
    <p className="mt-5 leading-relaxed text-muted-foreground">
      For generations, Bahar Al Zafran has been a name families trust for saffron, herbs
      and spices. Our supermarket and grinding mill sit at the crossroads of the city's
      oldest spice trade and the way people cook today.
    </p>
    <p className="mt-4 leading-relaxed text-muted-foreground">
      Every order can be ground to order on traditional stone mills, so the aroma you open
      at home is the aroma we sealed in the shop.
    </p>
  </div>
</div>
