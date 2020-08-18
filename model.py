import matplotlib.pyplot as plt

from mxnet import gluon, nd, image
from mxnet.gluon.data.vision import transforms
from gluoncv import utils
from gluoncv.model_zoo import get_model

# take image directory as "im"
def mxnet_cifar10(im):

    img = image.imread(im)

    # plt.imshow(img.asnumpy())
    # plt.show()

    # transform image
    transform_fn = transforms.Compose([
        transforms.Resize(32),
        transforms.CenterCrop(32),
        transforms.ToTensor(),
        transforms.Normalize([0.4914, 0.4822, 0.4465], [0.2023, 0.1994, 0.2010])
    ])

    img = transform_fn(img)
    # plt.imshow(nd.transpose(img, (1,2,0)).asnumpy())
    # plt.show()

    # load pre-trained model
    net = get_model('cifar_resnet110_v1', classes=10, pretrained=True)

    # predict class
    pred = net(img.expand_dims(axis=0))

    class_names = ['airplane', 'automobile', 'bird', 'cat', 'deer',
                'dog', 'frog', 'horse', 'ship', 'truck']
    ind = nd.argmax(pred, axis=1).astype('int')
    return [str(class_names[ind.asscalar()]), str(round(nd.softmax(pred)[0][ind].asscalar(), 2))]    