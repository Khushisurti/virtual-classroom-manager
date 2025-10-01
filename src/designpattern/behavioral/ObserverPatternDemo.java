import java.util.*;

// Subject
interface Subject {
    void addObserver(Observer o);
    void removeObserver(Observer o);
    void notifyObservers();
}

// Observer
interface Observer {
    void update(int temperature);
}

// Concrete Subject
class WeatherStation implements Subject {
    private List<Observer> observers = new ArrayList<>();
    private int temperature;

    public void setTemperature(int temperature) {
        this.temperature = temperature;
        notifyObservers();
    }

    public void addObserver(Observer o) { observers.add(o); }
    public void removeObserver(Observer o) { observers.remove(o); }

    public void notifyObservers() {
        for (Observer o : observers) o.update(temperature);
    }
}

// Concrete Observers
class MobileDisplay implements Observer {
    public void update(int temperature) {
        System.out.println("Mobile Display: Temp updated to " + temperature + "°C");
    }
}

class TVDisplay implements Observer {
    public void update(int temperature) {
        System.out.println("TV Display: Temp updated to " + temperature + "°C");
    }
}

// Client
public class ObserverPatternDemo {
    public static void main(String[] args) {
        WeatherStation station = new WeatherStation();
        station.addObserver(new MobileDisplay());
        station.addObserver(new TVDisplay());

        station.setTemperature(30);
        station.setTemperature(25);
    }
}
