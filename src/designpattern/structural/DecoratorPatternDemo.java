// Component
interface Coffee {
    String getDescription();
    int getCost();
}

// Concrete Component
class SimpleCoffee implements Coffee {
    public String getDescription() { return "Simple Coffee"; }
    public int getCost() { return 50; }
}

// Decorator
abstract class CoffeeDecorator implements Coffee {
    protected Coffee coffee;
    public CoffeeDecorator(Coffee coffee) { this.coffee = coffee; }
}

// Concrete Decorators
class Milk extends CoffeeDecorator {
    public Milk(Coffee coffee) { super(coffee); }
    public String getDescription() { return coffee.getDescription() + ", Milk"; }
    public int getCost() { return coffee.getCost() + 20; }
}

class Sugar extends CoffeeDecorator {
    public Sugar(Coffee coffee) { super(coffee); }
    public String getDescription() { return coffee.getDescription() + ", Sugar"; }
    public int getCost() { return coffee.getCost() + 10; }
}

// Client
public class DecoratorPatternDemo {
    public static void main(String[] args) {
        Coffee coffee = new SimpleCoffee();
        System.out.println(coffee.getDescription() + " -> Rs." + coffee.getCost());

        coffee = new Milk(coffee);
        System.out.println(coffee.getDescription() + " -> Rs." + coffee.getCost());

        coffee = new Sugar(coffee);
        System.out.println(coffee.getDescription() + " -> Rs." + coffee.getCost());
    }
}
