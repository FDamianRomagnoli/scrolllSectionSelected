export class ScrollSection {
    
    constructor(container){
        this.container = container;
        this.children = Array.from(container.children).filter(children => {
            return Array.from(children.classList).includes('SS-Item');
        }).map(children => {
            return children.getBoundingClientRect().top;
        });
        this.scrollPositionY = 0 ;
        this.scrollDirection = -1;
        this.scrollItem = 0;
        this.containerTop = container.getBoundingClientRect().top;
        this.moving = false;
    }

    on(){
        this.container.style.position = "relative"; 
        this.container.addEventListener('scroll', () => {
            this.getScrollDirection(this.container.scrollTop);
        });
        this.container.addEventListener('scroll', this.onScroll);
        this.container.onscroll = () => { window.scroll(0, 0); };
    }

    onScroll = () => {
        if(this.moving == false){
            this.moving = true;
            this.container.style.overflowY = "hidden";
            this.setScrollItem();
            this.container.scrollTo({
                top: this.children[this.scrollItem] - this.containerTop,
                behavior: 'smooth'
            });
        }else{
            if(this.container.scrollTop == this.children[this.scrollItem] - this.containerTop ){
                this.moving = false;
                this.container.style.overflowY = "scroll";
            }
        }
        
    }

    getScrollDirection(scrollTop){
        if(scrollTop > this.scrollPositionY){
            this.scrollPositionY = scrollTop;
            this.scrollDirection =  1;
        }else{
            this.scrollPositionY = scrollTop;
            this.scrollDirection =  -1;
        }
    }

    setScrollItem(){

        this.scrollItem += this.scrollDirection;

        this.scrollItem = this.scrollItem === -1 ? 0 : this.scrollItem === this.children.length ? (this.children.length - 1) : this.scrollItem;

        return this.scrollItem;

    }

}


