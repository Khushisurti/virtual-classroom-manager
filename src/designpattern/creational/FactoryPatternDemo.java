// Product
interface Shape {
    void draw();
}

// Concrete Products
class Circle implements Shape {
    public void draw() { System.out.println("Drawing Circle"); }
}
class Rectangle implements Shape {
    public void draw() { System.out.println("Drawing Rectangle"); }
}
class Square implements Shape {
    public void draw() { System.out.println("Drawing Square"); }
}

// Factory
class ShapeFactory {
    public Shape getShape(String type) {
        if (type.equalsIgnoreCase("circle")) return new Circle();
        else if (type.equalsIgnoreCase("rectangle")) return new Rectangle();
        else if (type.equalsIgnoreCase("square")) return new Square();
        return null;
    }
}

// Client
public class FactoryPatternDemo {
    public static void main(String[] args) {
        ShapeFactory factory = new ShapeFactory();

        Shape s1 = factory.getShape("circle");
        s1.draw();

        Shape s2 = factory.getShape("square");
        s2.draw();
    }
}
