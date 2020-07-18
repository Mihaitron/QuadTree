// Representation of a point
class Point
{
  constructor(x, y)
  {
    this.x = x;
    this.y = y;
  }
}

// Representation of a Rectangle (subdivition)
class Rectangle
{
  constructor(x, y, w, h)
  {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  
  contains(point)
  {
    return (point.x >= this.x - this.w &&
            point.x <= this.x + this.w &&
            point.y >= this.y - this.h &&
            point.y <= this.y + this.h);
  }
}

// Representation of the QuadTree
class QuadTree
{
  constructor(boundary, n)
  {
    this.boundary = boundary;
    this.capacity = n;
    this.points = [];
    this.divided = false;
  }
  
  subdivide()
  {
    // Get X & Y coordinates
    let x = this.boundary.x;
    let y = this.boundary.y;
    // Get width and height
    let w = this.boundary.w;
    let h = this.boundary.h;
    
    // Create new rectangles for each corner
    let neRect = new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2);
    let nwRect = new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2);
    let seRect = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);
    let swRect = new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2);
    
    // Create each quadrant using the rectangles and capacity
    this.ne = new QuadTree(neRect, this.capacity);
    this.nw = new QuadTree(nwRect, this.capacity);
    this.se = new QuadTree(seRect, this.capacity);
    this.sw = new QuadTree(swRect, this.capacity);
    
    // Set subtree as divided
    this.divided = true;
  }
  
  insert(point)
  {
    // If point is not in this quadrant, stop
    if (!this.boundary.contains(point))
    {
      return;
    }
    
    // If the capacity is not reached, push the point
    if (this.points.length < this.capacity)
    {
      this.points.push(point);
    }
    // Otherwise, subdivide and insert the point in each sub-quadrant
    else
    {
      if (!this.divided)
      {
       this.subdivide();
      }
      
      this.ne.insert(point);
      this.nw.insert(point);
      this.se.insert(point);
      this.sw.insert(point);
      
    }
  }
  
  show()
  {
    // Show this quadrant
    stroke(255);
    strokeWeight(1);
    noFill();
    rectMode(CENTER);
    rect(this.boundary.x, this.boundary.y, this.boundary.w * 2, this.boundary.h * 2);
    
    // Show all the subdivisions
    if (this.divided)
    {
      this.ne.show();
      this.nw.show();
      this.se.show();
      this.sw.show();
    }
    
    // Show all the points in this quadrant
    for (let p of this.points)
    {
      strokeWeight(4);
      point(p.x, p.y);
    }
  }
}
