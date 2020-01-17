/**
 * Copyright (c) 2019
 *
 * long description for the file
 *
 * @summary This file contains the class used for performing the OPTICS algorithm.
 * @author Jack Humble 
 *
 * Created at     : 2019-06-06 08:21:56 
 * Last modified  : 2019-06-06 15:31:40
 */
    
// ======================================================
// POINT CLASS
// ======================================================

class Point {
    constructor(x, y, processed, cd, rd, colour){
        this.x = x;
        this.y = y;
        this.processed = processed;
        this.cd = cd;
        this.rd = rd;
        this.colour = colour;
    }

    get_distance(other_point){
        var x1 = this.x
        var x2 = other_point.x
        var y1 = this.y
        var y2 = other_point.y
        
        var sqaure_distance = Math.pow((x2-x1), 2) + Math.pow((y2-y1),2);
        return Math.sqrt(sqaure_distance);
    }
}

// ======================================================
// OPTICS CLASS
// ======================================================

class OPTICS {
    constructor(points, epsilon, minPts){
        this.points = points;
        this.epsilon = epsilon;
        this.minPts = minPts;
    }

    _setup(){
        // set the reachability distance and core distance for each point to null.
        // set all points as unprocessed.
        for (const point of points){
            point.rd = null;
            point.cd = null;
            point.processed = false;
        }

        // Initialise a list of unprocessed points and an empty array of orederd points.
        this.unprocessed = points;
        this.ordered_list = [];
    }

    _core_distance(point, neighbours){
        if (point.cd !== null){
            return point.cd;
        }

        if (neighbours.length >= this.minPts - 1){
            var distance =  neighbours.map(x => x.get_distance(point));          // sorted([n.get_distance(point) for n in neighbours])
            var sorted_neighbours = distance.sort(function(a,b){return a-b});    // points.sort(function(a, b){return a - b}); 
            point.cd =  sorted_neighbours[this.minPts - 2];
            return point.cd;                                             
        }
    }

    _neighbours(point){
        var eps = this.epsilon;
        var neighbours_array = this.points.map(function(p){                      // return [p for p in self.points if p is not point and point.get_distance(p) <= self.epsilon]
            if (p.get_distance(point) <= eps && p !== point){
                return p;
            } else {
                return null;
            }
        })  
        return neighbours_array.filter(x => x !== null);                   
    }

    _processed(point){
        point.processed = true;

        const index = this.unprocessed.indexOf(point);
        this.unprocessed.splice(index, 1);
        this.ordered_list.push(point);
    }

    _update(point, neighbours, seeds){
        var unprocessed_neighbours = neighbours.filter(x => x.processed == false);

        for (const n of unprocessed_neighbours){
            var new_rd = Math.max(point.cd, point.get_distance(n));

            if (n.rd == null){
                n.rd = new_rd;
                seeds.push(n);
            } else if (new_rd < n.rd){
                n.rd = new_rd;
            }

        }

    }

    run(){
        this._setup();

        while (this.unprocessed !== undefined && this.unprocessed.length != 0){
            var point1 = this.unprocessed[0];

            this._processed(point1);
            var point_neighbours = this._neighbours(point1);

            if (this._core_distance(point1, point_neighbours) !== null){
                var seeds_arr = [];
                this._update(point1, point_neighbours, seeds_arr);

                while (seeds_arr !== undefined && seeds_arr.length != 0){

                    seeds_arr.sort(function(a,b){ return a.rd - b.rd});
                    var n = seeds_arr.shift();

                    this._processed(n);
                    var n_neighbours = this._neighbours(n);

                    if (this._core_distance(n, n_neighbours, seeds_arr) !== null){
                        this._update(n, n_neighbours, seeds_arr);
                    }
                }
            }
        }

        return this.ordered_list;
    }
}