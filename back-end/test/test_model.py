
# Unit testing with unittest
# import unittest, model

# class modelTest(unittest.TestCase):  
#     imgDir = "../plane-draw.jpeg"  
#     def test_mxnet(self):        
#         print("\nStart MXNET model test\n")

#         res = model.mxnet_cifar10(self.imgDir)
#         self.assertEqual(res, ['airplane', '0.39'])

#         print("\nFinish get_name test\n")

# if __name__ == '__main__':
#     # begin the unittest.main()
#     unittest.main()



# Unit testing with pytest
import model

def test_mxnet():        
    imgDir = "../plane-draw.jpeg" 
    res = model.mxnet_cifar10(imgDir)
    assert res == ['airplane', '0.39'] 
