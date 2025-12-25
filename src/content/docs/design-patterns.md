---
title: Design Patterns
description: Standard solutions to common problems.
category: Cross-Cutting
---

# Design Patterns: Proven Blueprints

## Creational Patterns

### Singleton
```javascript
class Database {
    constructor() {
        if (Database.instance) {
            return Database.instance;
        }
        this.connection = this.connect();
        Database.instance = this;
    }
    
    connect() {
        return { status: 'connected' };
    }
}

const db1 = new Database();
const db2 = new Database();
console.log(db1 === db2);  // true
```

**Use:** Single database connection, logger, configuration

### Factory
```javascript
class ShapeFactory {
    createShape(type) {
        switch(type) {
            case 'circle':
                return new Circle();
            case 'square':
                return new Square();
            default:
                throw new Error('Unknown shape');
        }
    }
}

const factory = new ShapeFactory();
const shape = factory.createShape('circle');
```

**Use:** Creating objects without specifying exact class

## Structural Patterns

### Adapter
```javascript
// Old API
class OldAPI {
    getData() {
        return { firstName: 'John', lastName: 'Doe' };
    }
}

// Adapter
class APIAdapter {
    constructor(oldAPI) {
        this.oldAPI = oldAPI;
    }
    
    getUser() {
        const data = this.oldAPI.getData();
        return {
            name: `${data.firstName} ${data.lastName}`
        };
    }
}

const adapter = new APIAdapter(new OldAPI());
console.log(adapter.getUser());  // { name: 'John Doe' }
```

**Use:** Making incompatible interfaces work together

### Decorator
```javascript
class Coffee {
    cost() {
        return 5;
    }
}

class MilkDecorator {
    constructor(coffee) {
        this.coffee = coffee;
    }
    
    cost() {
        return this.coffee.cost() + 2;
    }
}

class SugarDecorator {
    constructor(coffee) {
        this.coffee = coffee;
    }
    
    cost() {
        return this.coffee.cost() + 1;
    }
}

let coffee = new Coffee();
coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);
console.log(coffee.cost());  // 8
```

**Use:** Adding functionality without modifying original class

## Behavioral Patterns

### Observer (Pub/Sub)
```javascript
class EventEmitter {
    constructor() {
        this.events = {};
    }
    
    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }
    
    emit(event, data) {
        const callbacks = this.events[event];
        if (callbacks) {
            callbacks.forEach(cb => cb(data));
        }
    }
}

const emitter = new EventEmitter();
emitter.on('userLoggedIn', (user) => {
    console.log(`Welcome, ${user.name}!`);
});
emitter.emit('userLoggedIn', { name: 'Alice' });
```

**Use:** React `useEffect`, Event listeners, State management

### Strategy
```javascript
class PaymentStrategy {
    constructor(strategy) {
        this.strategy = strategy;
    }
    
    pay(amount) {
        return this.strategy.pay(amount);
    }
}

const CreditCard = {
    pay: (amount) => `Paid $${amount} with credit card`
};

const PayPal = {
    pay: (amount) => `Paid $${amount} with PayPal`
};

const payment = new PaymentStrategy(CreditCard);
payment.pay(100);  // "Paid $100 with credit card"
```

**Use:** Interchangeable algorithms

### Command
```javascript
class Command {
    execute() {}
    undo() {}
}

class AddTextCommand extends Command {
    constructor(editor, text) {
        super();
        this.editor = editor;
        this.text = text;
    }
    
    execute() {
        this.editor.content += this.text;
    }
    
    undo() {
        this.editor.content = this.editor.content.slice(0, -this.text.length);
    }
}

const editor = { content: '' };
const cmd = new AddTextCommand(editor, 'Hello');
cmd.execute();  // content: "Hello"
cmd.undo();     // content: ""
```

**Use:** Undo/Redo, Task queues

## React-Specific Patterns

### Higher-Order Component (HOC)
```jsx
function withAuth(Component) {
    return function AuthComponent(props) {
        const user = useAuth();
        if (!user) return <Redirect to="/login" />;
        return <Component {...props} user={user} />;
    };
}

const ProtectedPage = withAuth(Dashboard);
```

### Render Props
```jsx
<Mouse render={(mouse) => (
    <Cat position={mouse} />
)} />
```

### Custom Hooks (Modern)
```jsx
function useAuth() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        // Auth logic
    }, []);
    return user;
}
```

## Further Reading

- [Refactoring Guru: Design Patterns](https://refactoring.guru/design-patterns)
- [Patterns.dev](https://www.patterns.dev/)
