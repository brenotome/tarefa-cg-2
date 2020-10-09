class WaveAnimation{
    init(){
        let upperArmTween = new TWEEN.Tween({theta:0})
            .to({theta:degreeToRad(95)},500)
            .onUpdate(function(){
                console.log('upper arm')
                let right_upper_arm = ( (robot.getObjectByName("right_upper_arm")) )
                let rot_pt = new THREE.Vector3
                    (
                        ( right_upper_arm.geometry.parameters.width + right_upper_arm.__position.x) / 2,
                        ( right_upper_arm.geometry.parameters.height + right_upper_arm.__position.y) / 2.25,
                        -2
                    );
    
                right_upper_arm.rotateAroundPoint( rot_pt, this._object.theta - right_upper_arm.rotation.z );
    
                stats.update();
                renderer.render(scene, camera);    
            })
    
        let lowerArmTween = new TWEEN.Tween({theta:degreeToRad(0)})
            .to({theta:[degreeToRad(110), 0,degreeToRad(110), 0,degreeToRad(110), 0]},2000)
            .onUpdate(function() {
                let right_lower_arm = ( (robot.getObjectByName("right_upper_arm")).getObjectByName("lower_arm") );
                let rot_pt = new THREE.Vector3
                (
                    ( 0) / 2,
                    ( right_lower_arm.__position.y  ) / 1.6,
                    0
                );
                right_lower_arm.rotateAroundPoint( rot_pt, this._object.theta - right_lower_arm.rotation.z );
                // console.log(right_lower_arm)
                stats.update();
                renderer.render(scene, camera);
            })
        
        let upperArmBackTween = new TWEEN.Tween({theta:degreeToRad(95)})
            .to({theta:0},500)
            .onUpdate(function(){
                console.log('upper arm')
                let right_upper_arm = ( (robot.getObjectByName("right_upper_arm")) )
                let rot_pt = new THREE.Vector3
                    (
                        ( right_upper_arm.geometry.parameters.width + right_upper_arm.__position.x) / 2,
                        ( right_upper_arm.geometry.parameters.height + right_upper_arm.__position.y) / 2.25,
                        -2
                    );
    
                right_upper_arm.rotateAroundPoint( rot_pt, this._object.theta - right_upper_arm.rotation.z );
    
                stats.update();
                renderer.render(scene, camera);    
            })
            
    
        upperArmTween.chain(lowerArmTween)
        lowerArmTween.chain(upperArmBackTween)
        // lowerArmTween.repeat(2)
        // lowerArmTweenBack.chain(lowerArmTween)
        upperArmTween.start()       
    }
    animate(time){
        window.requestAnimationFrame(this.animate.bind(this));
        TWEEN.update(time);
    }
    run(){
        this.init();
        this.animate(0);
    }
    
}