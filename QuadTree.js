function setup() 
{
  createCanvas(400, 400);
  
  let capacity = 2;
  let number_of_points = 500;
  let boundary = new Rectangle(200, 200, 200, 200);
  
  // Create new QuadTree with given boundary as a rectangle and capacity/rectangle
  let qt = new QuadTree(boundary, capacity);
  
  // Insert given number of points at random coordinates into the QuadTree
  for (let i = 0; i < number_of_points; i++)
  {
    let p = new Point(random(width), random(height));
    
    qt.insert(p);
  }
  
  // Show the QuadTree in console
  console.log(qt);
  
  // Show QuadTree on screen 
  background(0);
  qt.show();
}
