
export interface Pet {
  id: number;
  name: string;
  species: string;
  breed: string;
  age: number;
  price: number;
  description: string;
  image: string;
  category: string;
  available: boolean;
}

export const petCategories = [
  "Dog",
  "Cat",
  "Bird",
  "Fish",
  "Small Pet"
];

export const petData: Pet[] = [
  {
    id: 1,
    name: "Raja",
    species: "Dog",
    breed: "Labrador Retriever",
    age: 2,
    price: 15000,
    description: "A majestic Labrador with a golden coat and friendly temperament. Raja loves to play and is great with children.",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=1000",
    category: "Dog",
    available: true
  },
  {
    id: 2,
    name: "Rani",
    species: "Dog",
    breed: "Golden Retriever",
    age: 1,
    price: 18000,
    description: "Rani is a beautiful Golden Retriever with a playful personality. She's trained in basic commands and loves to swim.",
    image: "https://images.unsplash.com/photo-1612502169027-5a379283f9c0?q=80&w=1000",
    category: "Dog",
    available: true
  },
  {
    id: 3,
    name: "Kaali",
    species: "Cat",
    breed: "Bombay",
    age: 3,
    price: 8000,
    description: "Kaali is a sleek black cat with mesmerizing yellow eyes. She's independent but affectionate with her chosen humans.",
    image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=1000",
    category: "Cat",
    available: true
  },
  {
    id: 4,
    name: "Mithai",
    species: "Cat",
    breed: "Persian",
    age: 2,
    price: 12000,
    description: "A sweet Persian cat with a luxurious white coat. Mithai is calm and loves to be groomed.",
    image: "https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?q=80&w=1000",
    category: "Cat",
    available: true
  },
  {
    id: 5,
    name: "Tota",
    species: "Bird",
    breed: "Indian Ringneck Parrot",
    age: 1,
    price: 5000,
    description: "A vibrant green parrot with excellent mimicking abilities. Tota can already say a few words in Hindi.",
    image: "https://images.unsplash.com/photo-1522858547137-f98a3562dcd4?q=80&w=1000",
    category: "Bird",
    available: true
  },
  {
    id: 6,
    name: "Moti",
    species: "Bird",
    breed: "Love Bird",
    age: 1,
    price: 3500,
    description: "A pair of beautiful love birds with colorful feathers. They chirp melodiously and bring joy to any home.",
    image: "https://images.unsplash.com/photo-1539310502697-8995f4108c33?q=80&w=1000",
    category: "Bird",
    available: true
  },
  {
    id: 7,
    name: "Machli",
    species: "Fish",
    breed: "Goldfish",
    age: 1,
    price: 500,
    description: "A vibrant orange goldfish with flowing fins. Machli is peaceful and adds beauty to any aquarium.",
    image: "https://images.unsplash.com/photo-1524704796725-9fc3044a58b2?q=80&w=1000",
    category: "Fish",
    available: true
  },
  {
    id: 8,
    name: "Neel",
    species: "Fish",
    breed: "Betta",
    age: 1,
    price: 800,
    description: "A stunning blue betta fish with flowing fins. Neel is territorial but fascinating to watch.",
    image: "https://images.unsplash.com/photo-1545048702-79362596cdc9?q=80&w=1000",
    category: "Fish",
    available: true
  },
  {
    id: 9,
    name: "Chuha",
    species: "Small Pet",
    breed: "Hamster",
    age: 1,
    price: 1000,
    description: "A cute little golden hamster that loves running on its wheel. Chuha is nocturnal but adorable.",
    image: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?q=80&w=1000",
    category: "Small Pet",
    available: true
  },
  {
    id: 10,
    name: "Kalu",
    species: "Dog",
    breed: "Indian Pariah Dog",
    age: 2,
    price: 5000,
    description: "A smart and loyal Indian native dog. Kalu is alert and makes an excellent watchdog.",
    image: "https://images.unsplash.com/photo-1583511655826-05700442881d?q=80&w=1000",
    category: "Dog",
    available: true
  },
  {
    id: 11,
    name: "Sheru",
    species: "Dog",
    breed: "German Shepherd",
    age: 3,
    price: 20000,
    description: "A brave and intelligent German Shepherd. Sheru is protective and quick to learn commands.",
    image: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?q=80&w=1000",
    category: "Dog",
    available: true
  },
  {
    id: 12,
    name: "Bagheera",
    species: "Cat",
    breed: "Maine Coon",
    age: 2,
    price: 15000,
    description: "A majestic Maine Coon with a thick coat. Bagheera is large but gentle and loves to cuddle.",
    image: "https://images.unsplash.com/photo-1615888388366-bcc39d349978?q=80&w=1000",
    category: "Cat",
    available: true
  },
  {
    id: 13,
    name: "Sundari",
    species: "Cat",
    breed: "Siamese",
    age: 1,
    price: 10000,
    description: "A beautiful Siamese cat with striking blue eyes. Sundari is vocal and forms strong bonds with her owners.",
    image: "https://images.unsplash.com/photo-1574144113084-b6f450cc5e0c?q=80&w=1000",
    category: "Cat",
    available: true
  },
  {
    id: 14,
    name: "Mor",
    species: "Bird",
    breed: "Peacock",
    age: 3,
    price: 25000,
    description: "A stunning male peacock with magnificent plumage. Mor needs a spacious outdoor enclosure.",
    image: "https://images.unsplash.com/photo-1555169062-013468b47731?q=80&w=1000",
    category: "Bird",
    available: true
  },
  {
    id: 15,
    name: "Bulbul",
    species: "Bird",
    breed: "Red-whiskered Bulbul",
    age: 1,
    price: 3000,
    description: "A melodious songbird native to India. Bulbul has a distinctive crest and beautiful call.",
    image: "https://images.unsplash.com/photo-1555169062-013468b47731?q=80&w=1000",
    category: "Bird",
    available: true
  },
  {
    id: 16,
    name: "Champa",
    species: "Fish",
    breed: "Guppy",
    age: 1,
    price: 200,
    description: "Colorful guppies with flowing tails. Champa is peaceful and adds vibrance to community tanks.",
    image: "https://images.unsplash.com/photo-1520302360930-d8a413f60bb7?q=80&w=1000",
    category: "Fish",
    available: true
  },
  {
    id: 17,
    name: "Raja Machli",
    species: "Fish",
    breed: "Koi",
    age: 2,
    price: 3000,
    description: "A beautiful orange and white koi fish. Raja Machli brings good fortune according to Vastu.",
    image: "https://images.unsplash.com/photo-1505628346881-b72b27e84530?q=80&w=1000",
    category: "Fish",
    available: true
  },
  {
    id: 18,
    name: "Khargosh",
    species: "Small Pet",
    breed: "Rabbit",
    age: 1,
    price: 2500,
    description: "A fluffy white rabbit with pink eyes. Khargosh is gentle and loves to hop around.",
    image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?q=80&w=1000",
    category: "Small Pet",
    available: true
  },
  {
    id: 19,
    name: "Chitrakar",
    species: "Small Pet",
    breed: "Guinea Pig",
    age: 1,
    price: 2000,
    description: "A multi-colored guinea pig with a friendly disposition. Chitrakar loves fresh vegetables.",
    image: "https://images.unsplash.com/photo-1612267168669-679c961c5b31?q=80&w=1000",
    category: "Small Pet",
    available: true
  },
  {
    id: 20,
    name: "Badshah",
    species: "Dog",
    breed: "Rottweiler",
    age: 2,
    price: 25000,
    description: "A powerful and devoted Rottweiler. Badshah is well-trained and protective of his family.",
    image: "https://images.unsplash.com/photo-1567752881298-894bb81f9379?q=80&w=1000",
    category: "Dog",
    available: true
  },
  {
    id: 21,
    name: "Tikki",
    species: "Dog",
    breed: "Pomeranian",
    age: 1,
    price: 12000,
    description: "An adorable fluffy Pomeranian with a cheerful personality. Tikki is small but full of energy.",
    image: "https://images.unsplash.com/photo-1582456891925-a53965520520?q=80&w=1000",
    category: "Dog",
    available: true
  },
  {
    id: 22,
    name: "Billu",
    species: "Cat",
    breed: "Bengal",
    age: 2,
    price: 18000,
    description: "A stunning Bengal cat with distinctive spotted coat. Billu is active and loves to climb.",
    image: "https://images.unsplash.com/photo-1568152950566-c1bf43f4ab28?q=80&w=1000",
    category: "Cat",
    available: true
  },
  {
    id: 23,
    name: "Malti",
    species: "Cat",
    breed: "Ragdoll",
    age: 2,
    price: 15000,
    description: "A gorgeous Ragdoll cat with blue eyes. Malti is docile and goes limp when picked up.",
    image: "https://images.unsplash.com/photo-1570824104453-508955ab713e?q=80&w=1000",
    category: "Cat",
    available: true
  },
  {
    id: 24,
    name: "Hara Tota",
    species: "Bird",
    breed: "Alexandrine Parakeet",
    age: 1,
    price: 6000,
    description: "A bright green parakeet native to India. Hara Tota is intelligent and can learn to talk.",
    image: "https://images.unsplash.com/photo-1604875432761-7074b0f56fb3?q=80&w=1000",
    category: "Bird",
    available: true
  },
  {
    id: 25,
    name: "Koyal",
    species: "Bird",
    breed: "Asian Koel",
    age: 2,
    price: 4500,
    description: "A beautiful songbird with a melodious call. Koyal is known for its haunting songs at dawn.",
    image: "https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?q=80&w=1000",
    category: "Bird",
    available: true
  },
  {
    id: 26,
    name: "Jal Rani",
    species: "Fish",
    breed: "Angelfish",
    age: 1,
    price: 600,
    description: "Elegant angelfish with vertical stripes. Jal Rani glides gracefully through the water.",
    image: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?q=80&w=1000",
    category: "Fish",
    available: true
  },
  {
    id: 27,
    name: "Neela",
    species: "Fish",
    breed: "Blue Gourami",
    age: 1,
    price: 400,
    description: "A beautiful blue gourami with iridescent scales. Neela is peaceful but shows interesting behaviors.",
    image: "https://images.unsplash.com/photo-1534043464124-3be32fe000c9?q=80&w=1000",
    category: "Fish",
    available: true
  },
  {
    id: 28,
    name: "Gillu",
    species: "Small Pet",
    breed: "Squirrel",
    age: 1,
    price: 1500,
    description: "An adorable Indian palm squirrel. Gillu is lively and entertaining to watch.",
    image: "https://images.unsplash.com/photo-1507666664345-c49223375e33?q=80&w=1000",
    category: "Small Pet",
    available: true
  },
  {
    id: 29,
    name: "Kachhua",
    species: "Small Pet",
    breed: "Star Tortoise",
    age: 3,
    price: 4000,
    description: "A beautiful Indian star tortoise with geometric shell patterns. Kachhua is slow but charming.",
    image: "https://images.unsplash.com/photo-1597162216923-ba6d99390c10?q=80&w=1000",
    category: "Small Pet",
    available: true
  },
  {
    id: 30,
    name: "Mottu",
    species: "Dog",
    breed: "Pug",
    age: 1,
    price: 15000,
    description: "An adorable pug with a wrinkled face and curly tail. Mottu is playful and loves attention.",
    image: "https://images.unsplash.com/photo-1575425186775-b8de9a427e67?q=80&w=1000",
    category: "Dog",
    available: true
  }
];

export interface AdoptionRequest {
  id: number;
  petId: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  date: string;
}

export const adoptionRequests: AdoptionRequest[] = [
  {
    id: 1,
    petId: 3,
    name: "Raj Kumar",
    email: "raj@example.com",
    phone: "9876543210",
    address: "123 Vikas Nagar, Delhi",
    reason: "I've always wanted a cat and Kaali looks perfect for my apartment living.",
    status: "pending",
    date: "2025-04-28"
  },
  {
    id: 2,
    petId: 10,
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "8765432109",
    address: "45 Saket Colony, Mumbai",
    reason: "Looking for a good companion dog for my children.",
    status: "approved",
    date: "2025-04-25"
  },
  {
    id: 3,
    petId: 18,
    name: "Vikram Singh",
    email: "vikram@example.com",
    phone: "7654321098",
    address: "78 Green Park, Bangalore",
    reason: "I want to provide a loving home for a rabbit.",
    status: "rejected",
    date: "2025-04-22"
  }
];

export const users = {
  admin: {
    id: 1,
    email: "admin@desipetparadise.com",
    password: "admin123",
    name: "Admin",
    role: "admin"
  },
  user: {
    id: 2,
    email: "user@example.com",
    password: "user123",
    name: "User",
    role: "user"
  }
};
